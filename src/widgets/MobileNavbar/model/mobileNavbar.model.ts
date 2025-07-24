import { ReactNode } from 'react';

export interface IMobileNavbarItem {
    id: number;
    name: string;
    href?: string;
    icon: ReactNode;
}
