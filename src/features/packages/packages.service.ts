import type { Package } from '../../types';

export const packagesService = {
  getAll: async () => {
    const res = await fetch('/api/packages');
    if (!res.ok) throw new Error('Packages fetch failed');
    const { data } = await res.json();
    return data as Package[];
  }
};

export async function getPackages() {
  const res = await fetch('/api/packages');
  if (!res.ok) throw new Error('Fetch failed');
  const { data } = await res.json();
  return data as Package[];
}
