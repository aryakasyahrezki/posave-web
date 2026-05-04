import { Head } from '@inertiajs/react';

import { HeadingSmall } from '@/components';
import { type BreadcrumbItem } from '@/types';
import { AppearanceTabs } from '../components';

import { AppLayout, SettingsLayout } from '@/layouts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
