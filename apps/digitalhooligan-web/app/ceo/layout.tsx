import * as React from 'react';
import CeoTopBar from '@/components/ceo/CeoTopBar';

export default function CeoLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <CeoTopBar />
            {children}
        </>
    );
}