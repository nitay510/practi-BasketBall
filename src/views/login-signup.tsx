import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate, Link } from "react-router-dom"

// actions
// import { login, signup } from "../store/user/user.action"

export function LoginSignup(): JSX.Element {
    interface User {
        name: string;
        age: number;
    }


    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const errorRef = useRef < React.RefObject < HTMLParagraphElement >> (null)
    const errorRef = useRef(null)
    const passwordRef = useRef(null)
    const location = useLocation()
    const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '', password: '', phone: '', email: '' })

    const [isPasswordVisible, setPasswordVisiable] = useState(false)

    const handleChange = ({ target }: { target: object }) => {
        if (!errorRef.current.hidden) hideError()
        const { name, value }: any = target
        setUserDetails({ ...userDetails, [name]: value })
    }

    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        location.pathname === '/login' ? onLogin() : onSignup()
    }

    const onLogin = async () => {
        // const { firstName, lastName, password } = userDetails
        // if (!firstName || !lastName || !password) {
        //     showError('נא מלאו את כל השדות כדי להיכנס')
        //         return
        //     }
        //     try {
        //         await dispatch(login({ firstName, lastName, password }))
        //     } catch {
        //         showError('הפרטים שגויים, נא נסו שנית')
        //     }
        //     clearForm()
    }

    const onSignup = async () => {
        // const { firstName, lastName, password, email, phone } = userDetails
        // const isValid = isFormValid()
        // if (!isValid) return
        // try {
        //     await dispatch(signup({ firstName, lastName, password, email, phone }))
        // } catch {
        //     showError('ההרשמה נכשלה')
        // }
        // clearForm()
    }

    const showError = (errorMsg = 'אחד השדות לא נכון, נא נסו שנית') => {
        console.log('errorRef.current', errorRef.current)
        errorRef.current.innerText = errorMsg
        errorRef.current.hidden = false
    }

    const hideError = () => {
        errorRef.current.hidden = true
    }

    const isFormValid = () => {
        const { firstName, lastName, password, email, phone } = userDetails
        if (!firstName || !lastName || !password || !email || !phone) {
            showError('כל השדות בטופס ההרשמה צריכים להיות מלאים בכדי להירשם לאתר')
            return false
        }
        if (!email.includes('@')) {
            showError('כתובת המייל שהזנת אינה ולידית.')
            return false
        }
        if (phone.length < 10 || isNaN(+phone)) {
            showError('מספר הפלאפון שהכנסת אינו ולידי.')
            return false
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
            showError('הסיסמא המוזנת צריכה להכיל לפחות אות אחת קטנה, גדולה, מספר ולהיות לפחות 8 ספרות.')
            return false
        }
        return true
    }

    const clearForm = () => {
        setUserDetails({ firstName: '', lastName: '', password: '', phone: '', email: '' })
    }

    const onChangeForm = () => {
        location.pathname === '/login' ? navigate('/signup') : navigate('/login')
        clearForm()
    }

    const togglePasswordVisiable = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        passwordRef.current.type = isPasswordVisible ? 'password' : 'text'
        setPasswordVisiable(!isPasswordVisible)
        console.log('passwordRef.current.type:', passwordRef.current.type);

    }

    return <section className="register-modal">
        {/* <form className="register-modal__form">
            <input className="register-modal__input" name="firstName" value={userDetails.firstName} onChange={handleChange} type="text" placeholder="הכניסו שם פרטי" autoFocus />
            <input className="register-modal__input" name="lastName" value={userDetails.lastName} onChange={handleChange} type="text" placeholder="הכניסו שם משפחה" />
            {location.pathname === '/signup' && <> <input className="register-modal__input" name="phone" value={userDetails.phone} onChange={handleChange} type="text" placeholder="הכניסו פלאפון" />
                <input className="register-modal__input" name="email" value={userDetails.email} onChange={handleChange} type="text" placeholder="הכניסו מייל" /></>}
            <input className="register-modal__input" name="password" value={userDetails.password} onChange={handleChange} type="password" placeholder="הכניסו סיסמא" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" ref={passwordRef} />
            <div className="password-options">
                <div className="password-options__remmember-user">
                    <input className="password-options__input" type="checkbox" name="" id="" />
                    <label>זכור אותי</label>
                </div>
                <button onClick={togglePasswordVisiable} className='password-options__show-password'>{isPasswordVisible ? 'הסתר סיסמא' : 'הראה סיסמא'}</button>
            </div>
            <button className="register-modal__cta-btn cta-btn" onClick={onSubmit}>{location.pathname === '/login' ? ' התחבר' : 'הירשם'}</button>
        </form> */}
        <div className="register-modal__alternatives-container">
            <div className="register-modal__or-seperator">
                <div className="border"></div>
                <p>או</p>
                <div className="border"></div>
            </div>
            <button className="register-modal__facebook-btn">התחבר באמצעות פייסבוק</button>
            <button className="register-modal__google-btn">התחבר באמצעות גוגל</button>
            <button className="register-modal__alternative-btn" onClick={onChangeForm}>{location.pathname === '/signup' ? 'התחבר עם חשבון קיים' : 'הירשם'}</button>
            <Link to={'/'} className='register-modal__skip-link'>דלגו לבינתיים </Link>
            <p ref={errorRef} hidden>No such user</p>
        </div>
    </section>
}


