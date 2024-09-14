'use client';

import { getSession, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function WorkoutComposerPage() {
    const { data: session, status } = useSession();

    console.log({ session });

    return (
        <main>
            <h1>Workout Composer</h1>
        </main>
    );
}
