// Admin services
import type { Booking, Package } from '@/types';

export async function getBookings() {
  const res = await fetch('/api/admin/bookings');
  const { data } = await res.json();
  return data as Booking[];
}

export async function adminLogin(password: string) {
  // Current is client-side, service can validate via API later
  if (password === process.env.NEXT_PUBLIC_ADMIN_PASS || 'admin123') return true;
  throw new Error('Invalid password');
}
