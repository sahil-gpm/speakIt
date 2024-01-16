import React, { useContext } from 'react'
import { usercontext } from '../context/Usercontext';
import { useNavigate } from 'react-router-dom';
import Levelcard from './Levelcard';

const Levels = () => {

  const { baseLanguage, learningLanguage } = useContext(usercontext);

  const navigate = useNavigate("/")

  return (
    <div className='level-selection-wrapper bg-text_light w-[95%] lg:w-[65%] py-20 rounded-xl mx-auto mt-[11%]'>

      <div className="level-heading text-start lg:text-center text-xl lg:text-4xl font-bold flex justify-center items-center gap-3 lg:gap-5">

        {baseLanguage === "Hindi" ? "अपने वर्तमान स्तर को चुनें ↴" : "Select your current level in " + learningLanguage + " ↴"}
      </div>

      <div className="levels text-start mt-12">

        <Levelcard
          label={baseLanguage === "Hindi" ? "नवोयस 😕" : "Novoice 😕"}
          description={baseLanguage === "Hindi" ? "अंग्रेजी में नए हैं, चिंता न करें हम यहाँ हैं आपके लिए 🙂" : "New to english, no worries we are there for you 🙂"}
          backgroundColor={"#ec4899"} 
          onClick={()=>{
             navigate("/docs/" + learningLanguage)
          }}/>

        <Levelcard
          label={baseLanguage === "Hindi" ? "इंटरमीडिएट 😬" : "Intermediate 😬"}
          description={baseLanguage === "Hindi" ? "अब ⚒️ अभ्यास करना शुरू करें और एक विशेषज्ञ बनें" : "Start doing exercises and become an expert ⚒️"}
          backgroundColor={"#f200b0"}
          onClick={()=>{
            navigate("/guess-word")
          }} />

        <Levelcard
          label={baseLanguage === "Hindi" ? "सहज 💪" : "Comfortable 💪"}
          description={baseLanguage === "Hindi" ? "जांचें कि हमारे पास आपके लिए क्या है और और आगे बढ़ें ➡️" : "See what we got for you ➡️"}
          backgroundColor={"black"}
          onClick={()=>{
            navigate("/translate-sentences")
          }} />
      </div>
    </div>







  )
}

export default Levels
