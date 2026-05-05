"use client";

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import type { Package } from '@/types';

interface PackageFormState {
  name: string;
  price: string;
  description: string;
  features: string;
}

const emptyForm: PackageFormState = {
  name: '',
  price: '',
  description: '',
  features: '',
};

export default function PackagesManager() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<PackageFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/packages');
      const json = await res.json();
      setPackages(json.data ?? []);
    } catch {
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchPackages(); }, []);

  const handleEdit = (pkg: Package) => {
    setEditId(pkg.id);
    setForm({
      name: pkg.name,
      price: String(pkg.price),
      description: pkg.description,
      features: (pkg.features ?? []).join('\n'),
    });
    setShowForm(true);
  };

  const handleNew = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.description) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        price: parseFloat(form.price),
        description: form.description,
        features: form.features ? form.features.split('\n').filter(Boolean) : [],
      };

      const url = editId ? `/api/packages?id=${editId}` : '/api/packages';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Save failed');

      toast.success(editId ? 'Package updated!' : 'Package created!');
      handleCancel();
      fetchPackages();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this package?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/packages?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Package deleted');
      fetchPackages();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeletingId(null);
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
            Photography Packages
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage your pricing packages
          </p>
        </div>
        <Button onClick={handleNew} size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          New Package
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-medium text-sm">
              {editId ? 'Edit Package' : 'New Package'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Name *</Label>
                <Input
                  placeholder="e.g. Premium"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Price (USD) *</Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="e.g. 599"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Description *</Label>
              <Textarea
                placeholder="Brief description of this package..."
                rows={2}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Features (one per line)</Label>
              <Textarea
                placeholder="4 hours of coverage\nHigh-res digital files\nOnline gallery"
                rows={3}
                value={form.features}
                onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" disabled={saving} className="gap-1.5">
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                {editId ? 'Update' : 'Create'}
              </Button>
              <Button onClick={handleCancel} size="sm" variant="outline" className="gap-1.5">
                <X className="w-3.5 h-3.5" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-sm">No packages yet. Create your first one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="border-border">
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h4 className="font-semibold text-foreground text-sm truncate">{pkg.name}</h4>
                    <span className="text-primary font-bold text-sm shrink-0">
                      ${pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{pkg.description}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEdit(pkg)}
                    aria-label={`Edit ${pkg.name}`}
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(pkg.id)}
                    disabled={deletingId === pkg.id}
                    aria-label={`Delete ${pkg.name}`}
                  >
                    {deletingId === pkg.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
