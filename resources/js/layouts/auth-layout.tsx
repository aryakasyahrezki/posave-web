import { AuthSimpleLayout } from '@/layouts';

export function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <AuthSimpleLayout title={title} description={description} {...props}>
            {children}
        </AuthSimpleLayout>
    );
}
