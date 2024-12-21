import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Workout Composer',
    manifest: 'manifest.json',
    openGraph: {
        title: 'Workout Composer',
        type: 'website',
        url: 'https://workout-composer.vercel.app',
        images: {
            href: 'https://workout-composer.vercel.app/',
            hash: '',
            host: '',
            hostname: '',
            origin: '',
            password: '',
            pathname: '',
            port: '',
            protocol: '',
            search: '',
            url: '',
            username: '',
            searchParams: new URLSearchParams(),
        },
    },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="rootWrapper">
                <Suspense>{children}</Suspense>
            </body>
        </html>
    );
}
