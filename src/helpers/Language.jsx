import React, { useContext } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { usercontext } from '../context/Usercontext'

const Language = ({ countryCode, label, base }) => {

    //invoking the context states from usercontext
    const { learningLanguage, setLearningLanguage, baseLanguage, setBaseLanguage } = useContext(usercontext);

    //local functions
    const setPreferences = () => {
        //if the language is the base language for the user 
        if (base) {
            setBaseLanguage(label)
            return
        }
        // else simply set the current language to be learned 
        setLearningLanguage(label)
    }


    return (
        <div className="cursor-pointer" onClick={setPreferences}>
            <ReactCountryFlag
                title={label}
                className='rounded-lg' style={{ width: "6.5rem", height: "7rem" }}
                svg
                countryCode={countryCode}
            />
            <div
                className='text-center capitalize font-semibold text-sub mt-2'>
                {
                    base && baseLanguage === label ? //the language is a base langauge option and selected as well
                        "Base ✅" :
                        !base && learningLanguage === label //the language is not base but selected
                            ? "Selected ✅"
                            : label //nothing done to the map
                }
            </div>
        </div>
    )
}

export default Language
