import { MOBILE_NAVBAR_ITEMS_ARRAY } from '../data/mobileNavbar.data';
import { MobileNavbarItem } from '@/features/MobileNavbarItem';

export const MobileNavbar = () => {
    return (
        <div className="fixed bottom-0 left-0 flex justify-between w-full px-4 bg-primary border-t border-gray-blue-light md:hidden">
            {MOBILE_NAVBAR_ITEMS_ARRAY.map((item) => (
                <MobileNavbarItem
                    key={item.id}
                    icon={item.icon as string}
                    href={item.href}
                    count={item.id === 3 ? '99+' : ''}
                />
            ))}
        </div>
    );
};
