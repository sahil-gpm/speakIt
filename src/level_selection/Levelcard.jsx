import React, { useContext } from 'react'
import Button from '../helpers/Button'
import { usercontext } from '../context/Usercontext'

const Levelcard = ({ label, description, backgroundColor,onClick }) => {

    const {baseLanguage } = useContext(usercontext)

    return (
        <div className='text-xl md:text-2xl font-bold text-start w-[95%] lg:w-[65%] mx-auto px-5 lg:px-10 py-6 my-3 text-white rounded-md flex justify-between items-center' style={{ backgroundColor: backgroundColor }} onClick={onClick}>
            <div>
                {label}
                <div className='text-xs md:text-sm font-semibold mt-1'>{description}</div>
            </div>
            <Button text={baseLanguage === "Hindi" ? "जारी रखें" : "Continue"} backgroundColor={"#ffffff"} textColor={"#000000"} width={100} padding={5} borderRadius={5}/>
        </div>
    )
}

export default Levelcard
