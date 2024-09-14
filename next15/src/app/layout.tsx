import './globals.scss';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '../auth';

export const metadata: Metadata = {
    title: 'Workout Composer',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    return (
        <html lang="en">
            <body className='rootWrapper'>
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
