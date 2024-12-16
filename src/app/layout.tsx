import './globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Workout Composer',
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
