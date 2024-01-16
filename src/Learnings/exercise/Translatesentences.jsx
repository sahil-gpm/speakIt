import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usercontext } from '../../context/Usercontext'
import Gamecleared from '../../Modal/Gamecleared'
import Gameover from '../../Modal/Gameover'
import Confetti from 'react-confetti'
import axios from 'axios'
import Button from '../../helpers/Button'
import over from '../../assets/sounds/over.mp3'
import toast from 'react-hot-toast'

const Translatesentences = () => {

    const { learningLanguage, baseLanguage, speak, userData } = useContext(usercontext) //context 
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0) //index of current question
    const [celebration, setCelebration] = useState(false) //signal for showing celebration
    const [sentences, setSentneces] = useState([]) //storing the questions 
    const [handleWrong, setHandleWrong] = useState(false) //if wrong answer is found
    const [sequence, setSequence] = useState("")
    const navigate = useNavigate("/") //react useNavigate

    //function to fetch the sentences from mongo
    const fetchSentences = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_GET_SENTENCES)
            setSentneces(response.data.data)
            console.log(response.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    //function to check the submitted answer 
    const checkAnswer = () => {
        if (!sequence) {
            toast.error("Select options from the given options")
            return
        }
        if ((sentences?.[currentSentenceIndex]?.sentence?.[`${learningLanguage}`]).toLowerCase().trim() === sequence.toLowerCase().trim()) {
            setCelebration(true)
            //set the timeout to remove the celebration
            setTimeout(() => {
                setCelebration(false)
                setCurrentSentenceIndex(currentSentenceIndex + 1)
            }, 3000)
            setSequence("")
            speak("Good going", 'hi-IN', 0.7)
        } else {
            setHandleWrong(true)
            new Audio(over).play()
        }
    }

    const updateProgress = async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + `/api/proress/set-${learningLanguage}-progress`, { email: userData.email, score: currentSentenceIndex })
            if (response.data.success) {
                toast.success("Progress updated")
            }
        } catch (e) {
            toast.error("Some error occurred while progress evaluation")
        }
        navigate("/")
    }

    //use effect hook
    useEffect(() => {
        fetchSentences()
    }, [])


    //main content to be shown
    return (
        <>
            {/* showing current score  */}
            <div className='text-center mt-[10%] lg:mt-[3%] text-xl md:text-3xl font-bold text-text_start py-4'>Score : {currentSentenceIndex} / 20</div>

            {/* showing heading as per the base language  */}
            <div className="heading text-xl md:text-3xl font-bold text-center mt-3">
                {baseLanguage === "Hindi" ? "वाक्यों का अनुवाद किसी अन्य भाषा में करें ➡️" : "Translate the sentences in " + learningLanguage + " ↴"}
            </div>

            {/* showing words and options  */}
            {!handleWrong && <div className='bg-bg_light py-12 mt-[2%] w-[80%] mx-auto text-center'>
                <div className="word text-xl lg:text-3xl font-semibold text-center bg-gradient-to-r from-text_start to-text_end text-trans bg-clip-text">
                    {(sentences?.[currentSentenceIndex]?.sentence?.[`${baseLanguage}`])}
                </div>

                <div className="created-sentence mt-10 font-semibold normal-case">
                    {sequence ? sequence : "Your answer here ↴"}
                </div>

                <div className="options w-[80%] mx-auto flex flex-wrap justify-center items-center gap-4 mt-[6%] mb-8">
                    {sentences?.[currentSentenceIndex]?.options?.[`${learningLanguage}`]}
                    {(sentences?.[currentSentenceIndex]?.options?.[`${learningLanguage}`])?.map((option, i) => {
                        return <div key={i}
                            className='text-base lg:text-xl text-white text-center w-[43%] lg:w-[15%] font-semibold px-2 py-2 rounded-full border transition-all duration-300 bg-sub cursor-pointer hover:bg-text_start hover:text-white'
                            onClick={() => {
                                setSequence(sequence.concat(option + " "))
                            }}
                        >
                            {option}
                            hello
                        </div>
                    })}
                </div>

                {/* submit and the clear button  */}
                <div className='flex justify-center gap-4'>
                    <Button text={"Submit"} textColor={"white"} backgroundColor={"green"} width={150} padding={10} borderRadius={4} onClick={() => {
                        checkAnswer()
                    }} />
                    <Button text={"Clear"} textColor={"white"} backgroundColor={"grey"} width={150} padding={10} borderRadius={4} onClick={() => {
                        setSequence("")
                    }} />
                </div>
            </div>}



            {/* show the celebration with confetti */}
            {celebration && <Confetti className='mx-auto w-full' height={400} />}

            {/* show modal on incorrect answer */}
            {handleWrong && <Gameover
                msg={"Oops! Incorrect answer😕"}
                des={"Unfortunately😕! you can't continue further, choose any one of the below options to continue ➡️"}
                onRestart={() => {
                    if (currentSentenceIndex < 20) {
                        setCurrentSentenceIndex(0)
                        setHandleWrong(false)
                        setSequence("")
                    }
                }}
                onQuit={updateProgress}
            />}

            {/* show when all the answers are cleared  */}
            {
                currentSentenceIndex === 20 && <Gamecleared
                    msg={"Successfully 💪 guessed all the words"}
                    des={"Congratulations 🎉 you have successfully guessed all the words in " + learningLanguage + " and now you can continue will further levels"}
                    onContinue={updateProgress}
                />
            }

            {/* quit button  */}
            {currentSentenceIndex < 20 && <div className='text-center mt-8'>
                <Button text={"Quit"} textColor={"white"} backgroundColor={"crimson"} width={150} padding={10} borderRadius={4} onClick={updateProgress} />
            </div>}
        </>
    )
}

export default Translatesentences