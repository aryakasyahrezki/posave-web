import { Plus } from 'lucide-react';

interface CreateButtonProps {
    label: string;
    onClick: () => void;
}

export function CreateButton({ label, onClick }: CreateButtonProps) {
    return (
        <button
            type="button"
            aria-label={`Buat ${label}`}
            onClick={onClick}
            className="flex items-center gap-2 rounded-lg bg-[var(--surface-header)] px-4 py-2 text-sm font-medium text-[var(--text-light)] transition-all hover:bg-[var(--surface-header-hover)]"
        >
            <Plus className="h-4 w-4" aria-hidden="true" />
            {label}
        </button>
    );
}
