import NavMain from "./navmain";
import NavLogged from "./navlogged";
import AuthService from "../services/AuthService";

export function Screen({ children }) {
    return (
        <>
            {AuthService.isLoggedIn() ? <NavLogged /> : <NavMain />}
            {children}
        </>
    );
}
