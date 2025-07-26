import { SignUpForm } from '@/widgets/SignUpForm';
import { SignUpPageHeader } from '@/features/SignUpPageHeader';
import { MobileNavbar } from '@/widgets/MobileNavbar';

export const SignUpPage = () => {
    return (
        <main className="bg-primary">
            <SignUpPageHeader />
            <SignUpForm />
            <MobileNavbar />
        </main>
    );
};
