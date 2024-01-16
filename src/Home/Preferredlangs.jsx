import React, { useContext } from 'react'
import Language from '../helpers/Language'
import Button from '../helpers/Button'
import { usercontext } from '../context/Usercontext'
import { useNavigate } from 'react-router-dom'

const Preferredlangs = ({ onCancel }) => {

    //importing required context values 
    const { learningLanguage, baseLanguage } = useContext(usercontext);

    //navigate 
    const navigate = useNavigate("/")

    //local function to implement further operations
    const handleStart = () => {
        //if both the learning and base language are choosen as same 
        if (learningLanguage === baseLanguage) {
            return
        }
        //if the required options are not selected 
        if (!learningLanguage || !baseLanguage) {
            return
        }

        //if the base language is unsupported
        if ((learningLanguage === "French" || learningLanguage === "German")
            && baseLanguage === "Hindi") {
            return
        }

        navigate("/select-level")
    }

    return (
        <div className='lang-wrapper w-[90%] lg:w-[45%]  mx-auto mt-20 text-black bg-white p-5 lg:p-16 shadow-xl rounded-lg border border-bg_light relative'>

            <div className='absolute top-1 lg:top-10 right-5'>
                <Button
                    text={"Cancel"}
                    textColor={"#ffffff"}
                    backgroundColor={"crimson"}
                    width={100}
                    padding={4}
                    borderRadius={20}
                    onClick={onCancel}
                />
            </div>

            {/* medium label  */}
            <div className='text-lg md:text-3xl font-bold text-start mt-10 md:mt-7'>Select <span className='bg-gradient-to-r from-text_start to-text_end text-trans bg-clip-text'>language</span> you wish to learn ↴</div>

            <div className='flex justify-start items-center gap-3 lg:gap-14 lg:mt-5'>
                <Language countryCode={'IN'} label={"hindi"} />
                <Language countryCode={'FR'} label={"french"} />
                <Language countryCode={'DE'} label={"german"} />
                <Language countryCode={'GB'} label={"english"} />
            </div>


            <div className='text-lg md:text-3xl font-bold text-start mt-12'>Select <span className='bg-gradient-to-r from-text_start to-text_end text-trans bg-clip-text'>language</span> in which you wish to learn ↴</div>

            <div className='flex justify-start items-center gap-14 mt-5'>
                {(learningLanguage === "english") && <Language countryCode={'IN'} label={"hindi"} base={true} />}
                {(learningLanguage !== "english") && <Language countryCode={'GB'} label={"english"} base={true} />}
            </div>

            <div className='text-center mt-10'>
                <Button
                    text={"Continue ➡"}
                    textColor={"#ffffff"}
                    width={"100%"}
                    padding={10}
                    borderRadius={4}
                    backgroundColor={"#000000"}
                    onClick={handleStart}
                />
            </div>

        </div>
    )

}

export default Preferredlangs