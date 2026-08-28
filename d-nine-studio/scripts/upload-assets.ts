import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { SanityClient } from '@sanity/client';
import { computeFileHash } from './migration-utils.js';

export interface AssetUploadResult {
  filePath: string;
  hash: string;
  assetId: string;
  sizeBytes: number;
}

export class AssetRegistry {
  private baseDir: string;
  private hashToAssetId: Map<string, string> = new Map();
  private pathToHash: Map<string, string> = new Map();
  private pathToSha1: Map<string, string> = new Map();
  private pathToAssetId: Map<string, string> = new Map();
  private missingFiles: string[] = [];
  private totalScanned = 0;

  constructor(baseDir: string) {
    this.baseDir = baseDir;
  }

  resolveLocalPath(relativePublicPath: string): string {
    const cleanPath = relativePublicPath.startsWith('/')
      ? relativePublicPath.slice(1)
      : relativePublicPath;
    return path.join(this.baseDir, cleanPath);
  }

  registerFile(relativePublicPath: string): {
    exists: boolean;
    absolutePath: string;
    hash: string | null;
  } {
    this.totalScanned++;
    const absolutePath = this.resolveLocalPath(relativePublicPath);
    if (!fs.existsSync(absolutePath)) {
      if (!this.missingFiles.includes(relativePublicPath)) {
        this.missingFiles.push(relativePublicPath);
      }
      return { exists: false, absolutePath, hash: null };
    }

    const hash = computeFileHash(absolutePath);
    if (hash) {
      this.pathToHash.set(relativePublicPath, hash);
      const fileBuffer = fs.readFileSync(absolutePath);
      const sha1 = crypto.createHash('sha1').update(fileBuffer).digest('hex');
      this.pathToSha1.set(relativePublicPath, sha1);
    }
    return { exists: true, absolutePath, hash };
  }

  getUniqueAssetCount(): number {
    return new Set(this.pathToSha1.values()).size;
  }

  getMissingFiles(): string[] {
    return [...this.missingFiles];
  }

  getTotalScanned(): number {
    return this.totalScanned;
  }

  getAssetId(relativePublicPath: string): string | undefined {
    return this.pathToAssetId.get(relativePublicPath);
  }

  getAllPaths(): string[] {
    return Array.from(this.pathToHash.keys());
  }

  async syncWithSanity(client: SanityClient, isDryRun: boolean = false): Promise<{
    existingInDataset: number;
    newlyUploaded: number;
    totalAssets: number;
    errors: string[];
  }> {
    const errors: string[] = [];
    let existingInDataset = 0;
    let newlyUploaded = 0;

    // Fetch existing assets from Sanity (both image and file assets)
    const existingAssets: Array<{ _id: string; _type: string; sha1hash?: string; originalFilename?: string }> =
      await client.fetch(`*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]{ _id, _type, sha1hash, originalFilename }`);

    const sha1ToId = new Map<string, string>();
    for (const asset of existingAssets) {
      if (asset.sha1hash) {
        sha1ToId.set(asset.sha1hash, asset._id);
      }
    }

    const uniquePaths = Array.from(new Set(this.pathToSha1.keys()));

    for (const relPath of uniquePaths) {
      const absPath = this.resolveLocalPath(relPath);
      if (!fs.existsSync(absPath)) continue;

      const sha1 = this.pathToSha1.get(relPath);
      if (!sha1) continue;

      const filename = path.basename(absPath);

      // Check if already mapped in this run (e.g. duplicate local file)
      if (this.hashToAssetId.has(sha1)) {
        const cachedId = this.hashToAssetId.get(sha1)!;
        this.pathToAssetId.set(relPath, cachedId);
        continue;
      }

      // Check if already in Sanity dataset by sha1
      let assetId = sha1ToId.get(sha1);

      if (assetId) {
        existingInDataset++;
        this.pathToAssetId.set(relPath, assetId);
        this.hashToAssetId.set(sha1, assetId);
      } else {
        if (isDryRun) {
          assetId = `image-planned-${sha1.slice(0, 10)}-800x600-jpg`;
          this.pathToAssetId.set(relPath, assetId);
          this.hashToAssetId.set(sha1, assetId);
        } else {
          try {
            const fileBuffer = fs.readFileSync(absPath);
            const isImage = /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i.test(filename);
            const uploaded = await client.assets.upload(isImage ? 'image' : 'file', fileBuffer, {
              filename,
            });
            assetId = uploaded._id;
            newlyUploaded++;
            this.pathToAssetId.set(relPath, assetId);
            this.hashToAssetId.set(sha1, assetId);
            sha1ToId.set(sha1, assetId);
          } catch (err: any) {
            errors.push(`Failed to upload asset '${relPath}': ${err?.message || err}`);
          }
        }
      }
    }

    // Populate all registered path mappings
    for (const [p, sha1] of this.pathToSha1.entries()) {
      const mappedId = this.hashToAssetId.get(sha1) || this.pathToAssetId.get(p);
      if (mappedId) {
        this.pathToAssetId.set(p, mappedId);
      }
    }

    return {
      existingInDataset,
      newlyUploaded,
      totalAssets: uniquePaths.length,
      errors,
    };
  }
}


