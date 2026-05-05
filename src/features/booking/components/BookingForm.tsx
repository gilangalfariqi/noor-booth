"use client";

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, CalendarIcon, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { bookingSchema, type BookingInput } from '@/lib/validations';
import type { Package } from '@/types';
import { bookingService } from '../booking.service';

interface BookingFormProps {
  packages: Package[];
  preselected?: string;
}

export default function BookingForm({ packages, preselected = '' }: BookingFormProps) {
  const preselectedPackage = preselected;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      date: '',
      package: preselectedPackage,
      notes: '',
    },
  });

  useEffect(() => {
    if (preselectedPackage) {
      setValue('package', preselectedPackage);
    }
  }, [preselectedPackage, setValue]);

  const selectedPackage = watch('package');

const onSubmit = async (data: BookingInput) => {
    setSubmitting(true);
    try {
      await bookingService.submit(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 flex flex-col items-center gap-5"
        >
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h3
            className="text-2xl font-semibold text-foreground"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Booking Berhasil Terkirim!
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Terima kasih! Kami telah menerima permintaan booking Anda dan akan segera menghubungi Anda
            dalam waktu 24 jam untuk konfirmasi jadwal.
          </p>
          <Button
            variant="outline"
            onClick={() => setSubmitted(false)}
            className="mt-2"
          >
            Booking Lagi
          </Button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name">
              Nama Lengkap <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Contoh: Sarah & James Wilson"
              {...register('name')}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-1.5">
            <Label htmlFor="date">
              Tanggal Event <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                {...register('date')}
                aria-invalid={!!errors.date}
                min={new Date().toISOString().split('T')[0]}
                className="pr-10"
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.date && (
              <p className="text-xs text-destructive">{errors.date.message}</p>
            )}
          </div>

          {/* Package */}
          <div className="space-y-1.5">
            <Label htmlFor="package">
              Pilih Paket Photobooth <span className="text-destructive">*</span>
            </Label>
            <Select
              value={selectedPackage}
              onValueChange={(val) => setValue('package', val!, { shouldValidate: true })}
            >
              <SelectTrigger id="package" aria-invalid={!!errors.package}>
                <SelectValue placeholder="Pilih paket..." />
              </SelectTrigger>
              <SelectContent>
                  {packages.length > 0 ? (
                    packages.map((pkg) => (
                      <SelectItem key={pkg.id} value={pkg.name}>
                        {pkg.name} — {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(pkg.price)}
                        {pkg.id === "premium-event" ? "+" : ""}
                      </SelectItem>
                    ))
                  ) : (
                    <>
                      <SelectItem value="Standard Event Package">Standard Event Package — Rp2.800.000</SelectItem>
                      <SelectItem value="Premium Event Package">Premium Event Package — Rp4.000.000+</SelectItem>
                    </>
                  )}
              </SelectContent>
            </Select>
            {errors.package && (
              <p className="text-xs text-destructive">{errors.package.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes">
              Catatan / Permintaan Khusus{' '}
              <span className="text-muted-foreground text-xs">(opsional)</span>
            </Label>
            <Textarea
              id="notes"
              placeholder="Ceritakan tentang tema acara, lokasi, atau permintaan khusus lainnya..."
              rows={4}
              {...register('notes')}
              aria-invalid={!!errors.notes}
            />
            {errors.notes && (
              <p className="text-xs text-destructive">{errors.notes.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 text-base"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Mengirim Permintaan...
              </>
            ) : (
              'Kirim Permintaan Booking'
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Kami akan konfirmasi dalam 24 jam. Belum ada pembayaran saat ini.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

