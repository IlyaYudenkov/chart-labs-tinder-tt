import { Input } from "@/shared/UI/Input/Input"
import { Button } from "../../shared/UI/Button/ui/Button"
import XMark from '@/shared/assets/images/XMark/XMarkIcon.svg'

export const SignUpPage = () => {
    return (
        <main className='bg-primary pt-4 pr-6 pb-7 pl-6'>
            <Button icon={XMark} />
            <h2 className='text-secondary text-28 font-bold mt-4 mb-7'>My first name is</h2>
            <Input placeholder="Luna" />
            <form className="mt-2">
                <div className="flex flex-col">
                    <span className="text-dark-gray-blue">This is how it will appear in Tinder</span>
                    <Button title="Continue" />
                </div>

            </form>
        </main>
    )
}