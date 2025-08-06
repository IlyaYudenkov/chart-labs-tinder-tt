import { HeaderBottom } from '../components/HeaderBottom';
import { ProgressBar } from '../components/ProgressBar';

export const SignUpPageHeader = () => {
    return (
        <div className="flex flex-col gap-4 mb-2">
            <ProgressBar />
            <HeaderBottom />
        </div>
    );
};
