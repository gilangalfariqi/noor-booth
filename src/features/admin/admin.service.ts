// Admin services
import type { Booking, Package } from '@/types';

export async function getBookings() {
  const res = await fetch('/api/admin/bookings');
  const { data } = await res.json();
  return data as Booking[];
}

export async function adminLogin(password: string) {
  // Current is client-side, service can validate via API later
  // Never ship secrets or default passwords to the client.
  // Actual authentication must be enforced server-side (see API route handlers).
  throw new Error('Admin authentication is not supported from the client.');
}
