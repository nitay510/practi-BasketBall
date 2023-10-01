import { CtaBar } from './cta-bar'
import { CtaBtn } from './cta-btn'
import { Hero } from "./hero"

interface CtaProps {
    handleClickScroll: () => void
    onToggleVidModal: () => void
}

export function Cta({ handleClickScroll, onToggleVidModal }: CtaProps) {

    return (
        <section className="cta-container">
            <Hero />

        </section>
    )
}