'use client';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useBuildStore } from '@/lib/store/buildStore';

const VEHICLE_ID = 'a0000000-0000-0000-0000-000000000001';

interface SaveBuildModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: (slug: string) => void;
}

export function SaveBuildModal({ open, onClose, onSaved }: SaveBuildModalProps) {
  const [name, setName]       = useState('');
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');

  const getSelectedPartsArray = useBuildStore((s) => s.getSelectedPartsArray);

  async function handleSave() {
    if (!name.trim()) return;
    setSaving(true);
    setError('');
    try {
      const parts = getSelectedPartsArray();
      const res = await fetch('/api/builds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle_id: VEHICLE_ID,
          name: name.trim(),
          selected_part_ids: parts.map((p) => p.id),
        }),
      });
      if (!res.ok) throw new Error('Save failed');
      const { slug } = await res.json();
      // Store slug in localStorage for anonymous ownership
      const saved = JSON.parse(localStorage.getItem('automod_builds') ?? '[]');
      saved.unshift(slug);
      localStorage.setItem('automod_builds', JSON.stringify(saved));
      onSaved(slug);
      setName('');
    } catch {
      setError('Could not save your build. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Save your build">
      <p className="text-sm text-muted mb-4">Give your build a name so you can share and find it later.</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        placeholder="e.g. Track Day Astra"
        maxLength={60}
        className="w-full px-4 py-3 bg-surface-hi border border-border rounded-xl text-white placeholder:text-muted outline-none focus:border-accent transition-colors text-sm"
      />
      {error && <p className="text-danger text-sm mt-2">{error}</p>}
      <button
        onClick={handleSave}
        disabled={saving || !name.trim()}
        className="mt-4 w-full py-3 bg-accent text-white font-semibold rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {saving ? 'Saving...' : 'Save Build'}
      </button>
    </Modal>
  );
}
