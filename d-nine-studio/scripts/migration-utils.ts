import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export interface LocalizedStringVal {
  ar: string;
  en: string;
}

export function computeFileHash(filePath: string): string | null {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

export function validateBilingualField(
  docId: string,
  fieldName: string,
  fieldVal?: LocalizedStringVal | null,
  errors: string[] = []
): boolean {
  if (!fieldVal) {
    errors.push(`[${docId}] Missing bilingual field: '${fieldName}'`);
    return false;
  }
  let valid = true;
  if (!fieldVal.ar || fieldVal.ar.trim() === '') {
    errors.push(`[${docId}] Missing Arabic translation in '${fieldName}'`);
    valid = false;
  }
  if (!fieldVal.en || fieldVal.en.trim() === '') {
    errors.push(`[${docId}] Missing English translation in '${fieldName}'`);
    valid = false;
  }
  return valid;
}

export function convertTextToPortableText(text: string) {
  if (!text) return [];
  const paragraphs = text.split('\n\n').filter((p) => p.trim() !== '');
  return paragraphs.map((para, index) => ({
    _key: `p_${index}_${para.slice(0, 10).replace(/[^a-zA-Z0-9]/g, '_')}`,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: `c_${index}`,
        _type: 'span',
        marks: [],
        text: para.trim(),
      },
    ],
  }));
}

export function convertBlogSectionsToPortableText(
  sections: { heading: LocalizedStringVal; body: LocalizedStringVal }[]
): { ar: any[]; en: any[] } {
  const arBlocks: any[] = [];
  const enBlocks: any[] = [];

  sections.forEach((sec, idx) => {
    // Heading
    if (sec.heading?.ar) {
      arBlocks.push({
        _key: `sec_${idx}_h_ar`,
        _type: 'block',
        style: 'h2',
        markDefs: [],
        children: [{ _key: `span_h_ar_${idx}`, _type: 'span', marks: [], text: sec.heading.ar }],
      });
    }
    if (sec.heading?.en) {
      enBlocks.push({
        _key: `sec_${idx}_h_en`,
        _type: 'block',
        style: 'h2',
        markDefs: [],
        children: [{ _key: `span_h_en_${idx}`, _type: 'span', marks: [], text: sec.heading.en }],
      });
    }

    // Body
    if (sec.body?.ar) {
      arBlocks.push(...convertTextToPortableText(sec.body.ar));
    }
    if (sec.body?.en) {
      enBlocks.push(...convertTextToPortableText(sec.body.en));
    }
  });

  return { ar: arBlocks, en: enBlocks };
}
