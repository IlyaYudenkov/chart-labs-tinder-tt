import { EButtonVariants } from '@/shared/UI/Button/model/button.model';
import { Button } from '@/shared/UI/Button/ui/Button';
import { NotificationItem } from '@/shared/UI/NotificationItem';

interface IMobileNavbarItem {
    count?: string;
    icon?: string;
    href?: string;
}

export const MobileNavbarItem = ({ count, icon, href }: IMobileNavbarItem) => {
    return (
        <div className="relative">
            <Button
                variant={EButtonVariants.default}
                icon={icon}
                href={href}
                className="p-2 active:scale-70"
            />
            <NotificationItem count={count} />
        </div>
    );
};
