import { AppSidebarLayout } from '@/layouts';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </AppSidebarLayout>
);
