"use client";

import { useState, useEffect } from 'react';
import { RefreshCw, Calendar, User, Package, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import type { Booking } from '@/types';

export default function BookingsList() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const json = await res.json();
      setBookings(json.data ?? []);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchBookings(); }, []);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatCreatedAt = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2
            className="text-xl font-semibold text-foreground"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Booking Requests
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {bookings.length} total booking{bookings.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={fetchBookings}
          disabled={loading}
          className="gap-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-28 rounded-xl" />)}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-sm">No bookings received yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <Card key={booking.id} className="border-border hover:border-border/80 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        {booking.name}
                      </div>
                      <Badge variant="secondary" className="text-xs font-medium">
                        <Package className="w-3 h-3 mr-1" />
                        {booking.package}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      Session: {formatDate(booking.date)}
                    </div>

                    {booking.notes && (
                      <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{booking.notes}</span>
                      </div>
                    )}
                  </div>

                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                    {formatCreatedAt(booking.created_at)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
