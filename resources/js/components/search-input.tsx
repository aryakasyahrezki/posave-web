import { Search } from 'lucide-react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    placeholder?: string;
}

export function SearchInput({ value, onChange, onSubmit, placeholder = 'Search' }: SearchInputProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[var(--grey-text)]" aria-hidden="true" />
                <input
                    type="text"
                    aria-label={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="focus:ring-ring h-10 rounded-lg border border-[var(--border-strong)] bg-[var(--neutral-white)] pr-4 pl-9 text-sm outline-none focus:ring-1"
                />
            </div>
        </form>
    );
}
