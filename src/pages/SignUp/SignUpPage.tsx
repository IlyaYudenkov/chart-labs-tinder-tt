import { SignUpForm } from '@/features/SignUpForm';
import { SignUpPageHeader } from '@/features/SignUpPageHeader';

export const SignUpPage = () => {
    return (
        <main className="bg-primary pb-7">
            <SignUpPageHeader />
            <SignUpForm />
        </main>
    );
};
