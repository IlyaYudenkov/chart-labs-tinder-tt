import { SignUpForm } from '@/widgets/SignUpForm';
import { SignUpPageHeader } from '@/features/SignUpPageHeader';

export const SignUpPage = () => {
    return (
        <main className="flex flex-col h-full overflow-hidden bg-white ">
            <SignUpPageHeader />
            <SignUpForm />
        </main>
    );
};
