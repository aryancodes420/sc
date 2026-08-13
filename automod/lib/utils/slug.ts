import { customAlphabet } from 'nanoid';

const nano = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);

export function generateSlug(buildName: string): string {
  const words = buildName
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean);
  const prefix = words.slice(0, 2).join('-');
  return prefix ? `${prefix}-${nano()}` : nano();
}
