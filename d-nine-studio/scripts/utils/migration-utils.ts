export function buildGranularSetIfMissing(source: any, existing: any, basePath = ''): Record<string, any> {
  const paths: Record<string, any> = {};
  for (const [key, value] of Object.entries(source)) {
    if (key === '_type' || key === '_id' || key === '_key') continue;
    
    const currentPath = basePath ? `${basePath}.${key}` : key;
    const existingVal = existing?.[key];

    if (existingVal === undefined) {
      // Genuinely missing path
      paths[currentPath] = value;
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // If it's an object and exists, recurse into it
      if (typeof existingVal === 'object' && !Array.isArray(existingVal)) {
        Object.assign(paths, buildGranularSetIfMissing(value, existingVal, currentPath));
      }
    }
  }
  return paths;
}
