import { CURRENT_STEP_INDEX_SS_KEY } from '@/shared/data/ssKeys.data';
import { EButtonVariants } from '@/shared/UI/Button/model/button.model';
import { Button } from '@/shared/UI/Button/ui/Button';
import { NotificationItem } from '@/shared/UI/NotificationItem';

interface IMobileNavbarItem {
    count?: string;
    icon?: string;
    href?: string;
}

export const MobileNavbarItem = ({ count, icon, href }: IMobileNavbarItem) => {
    //FUNCTION
    const handleOnClick = () => sessionStorage.removeItem(CURRENT_STEP_INDEX_SS_KEY);

    return (
        <div className="relative">
            <Button
                variant={EButtonVariants.DEFAULT}
                icon={icon}
                href={href}
                className="p-2 active:scale-70"
                onClick={handleOnClick}
            />
            <NotificationItem count={count} />
        </div>
    );
};
