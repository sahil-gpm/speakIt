import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { usercontext } from '../../context/Usercontext'
import json from '../../json/french.json' //getting the jso data
import ReactCountryFlag from 'react-country-flag'
import Button from '../../helpers/Button'
import { useNavigate } from 'react-router-dom'

const Frenchdocs = () => {

    const { speak, baseLanguage } = useContext(usercontext)
    const navigate = useNavigate("/")

    return (
        <div className='English-docs-wrapper mt-[3%] px-32 py-10'>

            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: -30, opacity: 1 }} transition={{ duration: 1 }} className="text-4xl font-bold mt-10">
                {json.Introduction} <ReactCountryFlag countryCode={json.Code} />
                <div className="text-base font-normal mt-2">{json.Description}</div>
            </motion.div>



            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: -30, opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="text-4xl font-bold mt-10">


                <div className="description-alphabets text-base font-normal mt-3">
                    {json.Alphabet.Vowels.Description}
                    {/* mapping the vowels  */}

                    <div className='mt-3 flex justify-start flex-wrap gap-4'>
                        {json.Alphabet.Vowels.List.map((vowel, i) => {
                            return <motion.div initial={{ x: 10,  opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1, delay: i * 1 }} className='vowel-wrapper bg-slate w-fit px-6 py-2 rounded-3xl text-white cursor-pointer'
                                onClick={() => {
                                    speak(vowel.Letter, 'fr-FR', 1)
                                }}>
                                {vowel.Letter + " " + vowel.Pronunciation}
                            </motion.div>
                        })}
                    </div>
                </div>


                <div className="description-alphabets text-base font-normal mt-5">
                    {json.Alphabet.Consonants.Description}
                    {/* mapping the consonants  */}

                    <div className='mt-3 flex justify-start flex-wrap gap-4'>
                        {json.Alphabet.Consonants.List.map((consonants, i) => {
                            return <motion.div initial={{ x: 10,  opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1, delay: i * 0.12 }} className='consonants-wrapper cursor-pointer bg-sub px-6 py-2 rounded-3xl text-white'
                                onClick={() => {
                                    speak(consonants.Letter, 'fr-FR', 1)
                                }}>
                                {consonants.Letter + " " + consonants.Pronunciation}
                            </motion.div>
                        })}
                    </div>
                </div>

            </motion.div>




            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: -30, opacity: 1 }} transition={{ duration: 1, delay: 1 }} className="text-4xl font-bold mt-14">
                {json['Common Phrases'].Description} 🔈

                <div className='flex flex-wrap justify-start gap-4 mt-5'>

                    {json['Common Phrases'].List.map((phrase, i) => {
                        return <motion.div initial={{ x: 10,  opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1, delay: i * 0.2 }} className='phrases-wrapper cursor-pointer bg-text_start w-fit px-8 py-2 rounded-3xl text-white text-base font-normal'
                            onClick={() => {
                                speak(phrase.Phrase, 'fr-FR', 0.8)
                            }}>
                            {phrase.Phrase + " " + phrase.Meaning}
                        </motion.div>
                    })}
                </div>
            </motion.div>




            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: -30, opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="text-4xl font-bold mt-14">

                Versuche, einige gewöhnliche Wörter auf Deutsch zu sprechen 🔈

                <div className='flex flex-wrap justify-start gap-4 mt-5'>
                    {json.Vocabulary.map((voc, i) => {
                        return <motion.div initial={{ x: 10,  opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1, delay: i * 0.2 }} className='phrases-wrapper cursor-pointer bg-purple w-fit px-6 py-2 rounded-3xl text-white text-base font-normal'
                            onClick={() => {
                                speak(voc.Word, 'fr-FR', 0.8)
                            }}>
                            {voc.Word + " " + voc.Meaning}
                        </motion.div>
                    })}
                </div>
            </motion.div>



            <motion.div initial={{ y: 0, opacity: 0 }} animate={{ y: -30, opacity: 1 }} transition={{ duration: 1, delay: 1.6 }} className="text-4xl font-bold mt-14">
                {json.Practice.Description} 🔈
                <motion.div className='flex flex-wrap justify-start gap-4 mt-5'>
                    {json.Practice.Sentences.map((sentence, i) => {
                        return <div initial={{ x: 10,  opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1, delay: i * 0.25 }} className='phrases-wrapper cursor-pointer bg-indigo w-fit px-6 py-2 rounded-3xl text-white text-base font-normal'
                            onClick={() => {
                                speak(sentence.Sentence, 'fr-FR', 0.8)
                            }}>
                            {sentence.Sentence + " " + sentence.Translation}
                        </div>
                    })}
                </motion.div>
            </motion.div>


            <div className='flex justify-start gap-5 mt-8'>
                <Button text={baseLanguage === "Hindi" ? "वापस" : "Back"}
                    textColor={"#ffffff"}
                    backgroundColor={"crimson"}
                    width={150}
                    padding={10}
                    borderRadius={6}
                    onClick={()=>navigate("/")}
                />
                <Button text={baseLanguage === "Hindi" ? "जारी रखें" : "Continue"}
                    textColor={"#ffffff"}
                    backgroundColor={"#000000"}
                    width={150}
                    padding={10}
                    borderRadius={6}
                    onClick={()=>{navigate("/guess-word")}}
                />
            </div>


        </div>
    )
}

export default Frenchdocs
