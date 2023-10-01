import { NavLink } from "react-router-dom"



export function CtaBtn() {
    return (
        < NavLink to={'/signup'}>
            <button className="cta-btn">
                Sign Up
            </button>
        </NavLink>
    )
}