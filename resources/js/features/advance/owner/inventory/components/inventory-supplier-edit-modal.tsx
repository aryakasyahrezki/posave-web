import { Button } from '@/components';
import { useForm } from '@inertiajs/react';
import { Store, UploadCloud, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import type { Supplier } from './inventory-supplier-actions-menu';

interface InventorySupplierEditModalProps {
    supplier: Supplier;
    onClose: () => void;
}

export function InventorySupplierEditModal({ supplier, onClose }: InventorySupplierEditModalProps) {
    const [preview, setPreview] = useState<string | null>(supplier.logo ? `/storage/${supplier.logo}` : null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        category: string;
        address: string;
        phone: string;
        email: string;
        logo: File | null;
        _method: string;
    }>({
        name: supplier.name,
        category: supplier.category ?? '',
        address: supplier.address ?? '',
        phone: supplier.phone ?? '',
        email: supplier.email ?? '',
        logo: null,
        _method: 'put',
    });

    const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('logo', file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('dashboard.inventory.suppliers.update', supplier.id), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-[var(--neutral-white)] shadow-xl">
                <div className="flex items-start justify-between p-6 pb-4">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                            <Store className="h-7 w-7 text-gray-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[var(--subheading)]">Ubah Pemasok</h3>
                            <p className="text-sm text-[var(--grey-text)]">Perbarui data pemasok anda</p>
                        </div>
                    </div>
                    <button onClick={handleClose} className="mt-1" aria-label="button-x">
                        <X className="h-5 w-5 text-[var(--grey-text)] hover:text-[var(--subheading)]" />
                    </button>
                </div>

                <div className="border-t border-[var(--border-strong)]" />

                <form onSubmit={handleSubmit}>
                    <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-[var(--subheading)]">Nama Pemasok</label>
                                <input
                                    aria-label="input-pemasok"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="border-input focus-visible:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                                />
                                {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-[var(--subheading)]">Kategori</label>
                                <input
                                    aria-label="input-kategori"
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="border-input focus-visible:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                                />
                                {errors.category && <span className="text-xs text-red-500">{errors.category}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[var(--subheading)]">Alamat</label>
                            <textarea
                                aria-label="input-alamat"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                rows={2}
                                className="border-input focus-visible:ring-ring w-full resize-none rounded-lg border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                            />
                            {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-[var(--subheading)]">Nomor Telepon</label>
                                <input
                                    aria-label="input-notlp"
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="border-input focus-visible:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                                />
                                {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-medium text-[var(--subheading)]">Email</label>
                                <input
                                    aria-label="input-email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="border-input focus-visible:ring-ring w-full rounded-lg border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
                                />
                                {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-[var(--subheading)]">
                                Logo <span className="font-normal text-[var(--grey-text)]">(Opsional)</span>
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="flex cursor-pointer items-center gap-4 rounded-lg border border-dashed border-[var(--border-strong)] p-4 transition-colors hover:bg-[var(--surface-badge)]"
                            >
                                {preview ? (
                                    <img src={preview} alt="preview" className="h-12 w-12 rounded-full object-cover" />
                                ) : (
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                        <UploadCloud className="h-6 w-6 text-gray-400" />
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-[var(--subheading)]">Ganti logo</p>
                                    <p className="text-xs text-[var(--grey-text)]">PNG, JPG atau WEBP. Maksimal 2MB</p>
                                </div>
                            </div>
                            <input aria-label="input-logo" ref={fileInputRef} type="file" accept="image/*" onChange={handleLogo} className="hidden" />
                            {errors.logo && <span className="text-xs text-red-500">{errors.logo}</span>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-[var(--border-strong)] px-6 py-4">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
