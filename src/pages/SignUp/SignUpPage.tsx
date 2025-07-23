import { SignUpForm } from '@/widgets/SignUpForm';
import { SignUpPageHeader } from '@/features/SignUpPageHeader';

export const SignUpPage = () => {
    return (
        <main className="bg-primary">
            <SignUpPageHeader />
            <SignUpForm />
        </main>
    );
};
