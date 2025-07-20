import type { RouteProps } from "react-router-dom";
import { MAIN_PAGES } from "./routes";
import { SignUpPage } from "../../pages/SignUp/SignUpPage";

export const routes: RouteProps[] = [
    {
        path: MAIN_PAGES.SIGN_UP.path,
        element: <SignUpPage />
    },
]