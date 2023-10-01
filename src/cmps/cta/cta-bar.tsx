import { MdIosShare } from 'react-icons/md'
import { MdPlayArrow } from 'react-icons/md'
import { IoBasketballOutline } from 'react-icons/io5'

interface CtaBarprops {
    handleClickScroll: () => void;
    onToggleVidModal: () => void
}

export const CtaBar = ({ handleClickScroll, onToggleVidModal }: CtaBarprops): JSX.Element => {
    return (
        <div className="cta-bar">
            <div className='ic-container'>

                <IoBasketballOutline onClick={() => {
                    handleClickScroll()
                }} />

                <span>Practice</span>
            </div>
            <div className='ic-container'>
                <MdPlayArrow onClick={onToggleVidModal} />
                <span>Trailer</span>
            </div>
            <div className='ic-container'>
                <MdIosShare />
                <span>Share</span>
            </div>
        </div>


    )
}