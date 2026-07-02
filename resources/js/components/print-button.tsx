import { Printer } from 'lucide-react';

interface PrintButtonProps {
    onClick?: () => void;
    label?: string;
}

export function PrintButton({ onClick, label = 'Cetak' }: PrintButtonProps) {
    return (
        <button
            type="button"
            aria-label={`Cetak ${label}`}
            onClick={onClick ?? (() => window.print())}
            className="flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--neutral-white)] px-4 py-2 text-sm font-medium text-[var(--grey-text)] transition-all hover:bg-[var(--second-accent)]"
        >
            <Printer className="h-4 w-4" aria-hidden="true" />
            {label}
        </button>
    );
}
