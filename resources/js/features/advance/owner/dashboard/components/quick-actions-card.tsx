import { Link } from '@inertiajs/react';
import { FileText, Package, Plus, Receipt, ReceiptText, UserPlus, type LucideIcon } from 'lucide-react';

interface QuickAction {
    label: string;
    icon: LucideIcon;
    routeName: string;
    color: string;
    bg: string;
}

const QUICK_ACTIONS: QuickAction[] = [
    {
        label: 'Tambah Produk',
        icon: Plus,
        routeName: 'dashboard.inventory.items.create',
        color: 'var(--income-icon-text)',
        bg: 'var(--income-icon-bg)',
    },
    { label: 'Lihat Produk', icon: Package, routeName: 'dashboard.inventory.items.index', color: 'var(--success)', bg: 'var(--success-background)' },
    { label: 'Tambah Karyawan', icon: UserPlus, routeName: '', color: 'var(--category-color-1)', bg: 'var(--category-bg-color-3)' },
    { label: 'Laporan Penjualan', icon: ReceiptText, routeName: 'dashboard.reports.index', color: 'var(--warning)', bg: 'var(--warning-background)' },
    { label: 'Laporan Stok', icon: FileText, routeName: '', color: 'var(--income-icon-text)', bg: 'var(--income-icon-bg)' },
    { label: 'Cetak Struk', icon: Receipt, routeName: '', color: 'var(--danger)', bg: 'var(--danger-background)' },
];

function quickActionHref(routeName: string) {
    return routeName ? route(routeName) : '#';
}

export function QuickActionsCard({ className }: { className?: string }) {
    return (
        <div className={`rounded-2xl border border-[var(--border)] bg-[var(--neutral-white)] p-4 shadow-sm sm:p-6 ${className ?? ''}`}>
            <h3 className="mb-4 text-sm font-semibold text-[var(--subheading)]">Aksi Cepat</h3>
            <div className="grid grid-cols-3 gap-3">
                {QUICK_ACTIONS.map((action) => (
                    <Link
                        key={action.label}
                        href={quickActionHref(action.routeName)}
                        className="flex flex-col items-center gap-2 rounded-xl border border-[var(--border)] p-3 text-center transition-colors hover:bg-[var(--second-accent)]"
                    >
                        <span
                            className="flex h-10 w-10 items-center justify-center rounded-full"
                            style={{ backgroundColor: action.bg, color: action.color }}
                        >
                            <action.icon className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] leading-tight font-medium text-[var(--grey-text)]">{action.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
