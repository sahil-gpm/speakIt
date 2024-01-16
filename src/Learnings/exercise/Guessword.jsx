import React, { useContext, useEffect, useState } from 'react'
import { usercontext } from '../../context/Usercontext'
import axios from 'axios'
import Button from '../../helpers/Button'
import Confetti from 'react-confetti'
import over from '../../assets/sounds/over.mp3'
import Gameover from '../../Modal/Gameover'
import { useNavigate } from 'react-router-dom'
import Gamecleared from '../../Modal/Gamecleared'
import toast from 'react-hot-toast'


const Guessword = () => {

    const { learningLanguage, baseLanguage, speak, userData } = useContext(usercontext) //context 
    const [currentWordIndex, setCurrentWordIndex] = useState(0) //index of current question
    const [celebration, setCelebration] = useState(false) //signal for showing celebration
    const [words, setWords] = useState([]) //storing the questions 
    const [handleWrong, setHandleWrong] = useState(false) //if wrong answer is found
    const navigate = useNavigate("/") //react useNavigate


    //function to fetch the words from mongo
    const fetchWords = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_GET_WORDS)
            setWords(response.data.data)
        } catch (e) {
            console.log(e);
        }
    }

    //check answer
    const checkAnswer = (option) => {
        if ((words?.[currentWordIndex]?.word?.[`${learningLanguage}`]) === option) {
            speak(option, learningLanguage === "hindi" ? "hi-IN" : learningLanguage === "english" ? "en-US" : learningLanguage === "french" ? "fr-FR" : "de-DE", .7,)
            setCelebration(true)

            //set the timeout to remove the celebration
            setTimeout(() => {
                setCelebration(false)
                setCurrentWordIndex(currentWordIndex + 1)
            }, 3000)
        } else {
            setHandleWrong(true)
            new Audio(over).play()
        }
    }

    const updateProgress = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/api/progress/set-${learningLanguage}-progress`, { email: userData.email, score: currentWordIndex })
            if (response.data.success) {
                toast.success("Progress updated")
            }
        } catch (e) {
            toast.error("Some error occurred while progress evaluation")
        }

        //navigate to the next stage
        navigate("/translate-sentences")
    }

    //fetch questions with useEffect
    useEffect(() => {
        fetchWords()
    }, [])

    return (
        <>

            {/* showing current score  */}
            <div className='text-center mt-[15%] lg:mt-[3%] text-xl md:text-3xl font-bold text-text_start'>Score : {currentWordIndex} / 30</div>

            {/* showing heading as per the base language  */}
            <div className="heading text-xl md:text-3xl font-bold text-center mt-3">
                {baseLanguage === "Hindi" ? "शब्दों का अर्थ अनुमान करें ➡️" : "Guess the word appropriate meanings ↴"}
            </div>

            {/* showing words and options  */}
            {!handleWrong && <div className='bg-bg_light py-12 lg:py-20 mt-[2%] w-[80%] lg:w-[60%] mx-auto'>
                <div className="word text-2xl xl:text-4xl font-bold text-center capitalize mt-3 bg-gradient">
                    {(words?.[currentWordIndex]?.word?.[`${baseLanguage}`])}
                </div>

                <div className="options w-[50%] mx-auto flex flex-wrap justify-center items-center gap-8 mt-10">
                    {(words?.[currentWordIndex]?.options?.[`${learningLanguage}`])?.map((option) => {
                        return <div key={option} className='text-xl xl:text-4xl text-center w-full lg:w-[60%] font-semibold px-5 py-3 rounded-lg border transition-all duration-300 border-text_start cursor-pointer
                         hover:bg-text_start 
                         hover:text-white'
                            onClick={() => checkAnswer(option)}>
                            {option}
                        </div>
                    })}
                </div>
            </div>}

            {/* show the celebration with confetti */}
            {celebration && <Confetti className='mx-auto w-full' height={400} />}

            {/* show modal on incorrect answer */}
            {handleWrong && <Gameover
                msg={"Oops! Incorrect answer😕"}
                des={"Unfortunately😕! you can't continue further, choose any one of the below options to continue ➡️"}
                onRestart={() => {
                    if (currentWordIndex < 30) {
                        setCurrentWordIndex(0)
                        setHandleWrong(false)
                    }
                }}
                onQuit={updateProgress}
            />}

            {
                currentWordIndex === 30 && <Gamecleared
                    msg={"Successfully 💪 guessed all the words"}
                    des={"Congratulations 🎉 you have successfully guessed all the words in " + learningLanguage + " and now you can continue will further levels"}
                    onContinue={updateProgress}
                />
            }

            {/* quit button  */}
            {currentWordIndex < 30 && <div className='text-center mt-8'>
                <Button text={"Quit"} textColor={"white"} backgroundColor={"crimson"} width={150} padding={10} borderRadius={4} onClick={updateProgress} />
            </div>}
        </>
    )
}

export default Guessword
