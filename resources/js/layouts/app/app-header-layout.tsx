import { AppContent, AppHeader, AppShell } from '@/components';
import { type BreadcrumbItem } from '@/types';

interface AppHeaderLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeaderLayout({ children, breadcrumbs }: AppHeaderLayoutProps) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
