import { MobileNavbar } from '@/widgets/MobileNavbar';
import { PropsWithChildren } from 'react';

interface IMobileLayout extends PropsWithChildren {}

export const MobileLayout = ({ children }: IMobileLayout) => {
    return (
        <div className="relative pb-12 md:pb-0">
            {children}
            <MobileNavbar />
        </div>
    );
};
