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
            url: 'https://workout-composer.vercel.app/brand/brand-og.png',
            width: 256,
            height: 256,
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
