import { Button } from '@/components/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { Printer, Store } from 'lucide-react';
import { useState } from 'react';

export interface OutletOption {
    id: number;
    name: string;
}

export interface SalesFilters {
    outlet_id: number | null;
    range: string;
    from: string;
    to: string;
    label: string;
    days: number;
}

interface Props {
    routeName: string;
    outlets: OutletOption[];
    filters: SalesFilters;
    /** Param tambahan yang ingin dipertahankan saat filter berubah (mis. tab aktif). */
    extraParams?: Record<string, string>;
    onPrint?: () => void;
}

const RANGE_PRESETS: { value: string; label: string }[] = [
    { value: 'today', label: 'Hari ini' },
    { value: '7d', label: '7 Hari' },
    { value: '30d', label: '30 Hari' },
    { value: '90d', label: '90 Hari' },
    { value: 'custom', label: 'Custom' },
];

export function SalesFilterBar({ routeName, outlets, filters, extraParams = {}, onPrint }: Props) {
    const [from, setFrom] = useState(filters.from);
    const [to, setTo] = useState(filters.to);

    const visit = (next: Partial<SalesFilters>) => {
        const merged = { ...filters, ...next };
        const params: Record<string, string> = { ...extraParams, range: merged.range };

        if (merged.outlet_id) params.outlet_id = String(merged.outlet_id);
        if (merged.range === 'custom') {
            params.from = next.from ?? from;
            params.to = next.to ?? to;
        }

        router.get(route(routeName), params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
                {/* Outlet */}
                <Select
                    value={filters.outlet_id ? String(filters.outlet_id) : 'all'}
                    onValueChange={(v) => visit({ outlet_id: v === 'all' ? null : Number(v) })}
                >
                    <SelectTrigger className="h-10 w-[200px] gap-2 rounded-lg border-transparent bg-[var(--second-accent)] font-medium text-[var(--subheading)] shadow-sm">
                        <span className="!flex min-w-0 items-center gap-2">
                            <Store className="h-4 w-4 shrink-0 text-[var(--grey-text)]" />
                            <SelectValue placeholder="Semua Outlet" />
                        </span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Outlet</SelectItem>
                        {outlets.map((o) => (
                            <SelectItem key={o.id} value={String(o.id)}>
                                {o.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Preset rentang tanggal */}
                <div className="flex h-10 items-center rounded-md border border-[var(--border)] bg-[var(--neutral-white)] p-1 shadow-sm">
                    {RANGE_PRESETS.map((preset) => (
                        <button
                            key={preset.value}
                            onClick={() => visit({ range: preset.value })}
                            className={`h-full rounded px-3 text-sm font-medium transition-colors ${
                                filters.range === preset.value
                                    ? 'bg-[var(--surface-header)] text-[var(--text-light)]'
                                    : 'text-[var(--grey-text)] hover:bg-[var(--second-accent)]'
                            }`}
                        >
                            {preset.label}
                        </button>
                    ))}
                </div>

                {/* Input tanggal custom */}
                {filters.range === 'custom' && (
                    <div className="flex h-10 items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--neutral-white)] px-3 shadow-sm">
                        <input
                            type="date"
                            value={from}
                            max={to}
                            onChange={(e) => setFrom(e.target.value)}
                            onBlur={() => visit({ range: 'custom', from })}
                            className="bg-transparent text-sm text-[var(--subheading)] outline-none"
                        />
                        <span className="text-[var(--grey-text)]">–</span>
                        <input
                            type="date"
                            value={to}
                            min={from}
                            onChange={(e) => setTo(e.target.value)}
                            onBlur={() => visit({ range: 'custom', to })}
                            className="bg-transparent text-sm text-[var(--subheading)] outline-none"
                        />
                    </div>
                )}
            </div>

            <Button
                variant="outline"
                onClick={onPrint ?? (() => window.print())}
                className="h-10 border-[var(--border)] bg-[var(--neutral-white)] text-[var(--subheading)]"
            >
                <Printer className="mr-2 h-4 w-4" />
                Cetak
            </Button>
        </div>
    );
}
