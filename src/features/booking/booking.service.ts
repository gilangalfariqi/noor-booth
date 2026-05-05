import type { BookingInput } from '@/lib/validations';

export const bookingService = {
  submit: async (data: BookingInput) => {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Submit failed');
    }
    return res.json();
  }
};
import type { Booking } from '@/types';

export async function submitBooking(data: BookingInput) {
  const res = await fetch('/api/booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Submit failed');
  return res.json() as Promise<{ success: true; message: string }>;
}
