import React, { useState, useContext } from 'react'
import main from '../assets/main.png'
import Button from '../helpers/Button'
import Preferredlangs from './Preferredlangs'
import { motion } from 'framer-motion'
import Typinganimation from '../helpers/Typing'
import toast from 'react-hot-toast'
import Signup from '../auth/Signup'
import { usercontext } from '../context/Usercontext'

const Intro = () => {


  //context
  const { token } = useContext(usercontext)

  //states for popups 
  const [preferences, setPreferences] = useState(false)
  const [createAcc, setCreateAcc] = useState(false)

  return (

    <>

      {/* content that will be poped up  */}
      {preferences && <motion.div animate={{ y: -20 }} transition={{ duration: 0.6, easings: true, delay: .01 }} className='absolute left-0 right-0 top-10'><Preferredlangs onCancel={() => { setPreferences(false) }} /></motion.div>}

      {/* content that will be poped up for signup */}
      {createAcc && <Signup onCancel={()=>setCreateAcc(false)}/>}

      {/* <Spline className='bg-white' scene="https://prod.spline.design/2jIbAw1TwP8ZEmTo/scene.splinecode" /> */}

      <div className='intro-wrapper flex flex-col-reverse lg:flex-row justify-center items-center gap-1 mt-[20%] md:mt-[10%]'>

        {/* text : for introduction  */}
        <div className="big-label text-3xl lg:text-6xl font-bold xl:max-w-[50%] text-sub text-center md:text-start mt-10 xl:mt-0">
          <span className='bg-gradient-to-r from-text_start to-text_end text-trans bg-clip-text'>SpeakIt</span> - increase your<br /> capability to communicate.


          <div className='text-xl first-line:md:text-3xl pl-1 mt-3'><span>Learn</span> <Typinganimation /></div>

          {/* little description  */}
          <div className="description text-sm mt-4 font-semibold pl-1 px-5 xl:px-0">
            Welcome to our web based platform 🤍 which makes language learning more easier 💪
          </div>


          {/* buttons for further actions  */}
          <div className='pl-1 flex flex-col  md:flex-row justify-start items-center gap-3 mt-12 md:mt-5'>
            <Button text={"Start Learning"} gradient={true} textColor={"#ffffff"} width={200} padding={12} borderRadius={5} onClick={() => {
              if(!token){
                toast.error("Login to your account")
                return
              }
              setPreferences(true)}} />
            <Button text={"Create account"} textColor={"#ffffff"} backgroundColor={"#000000"} width={200} padding={12} borderRadius={5} onClick={() => {
              if (!token) {
                setCreateAcc(true)
                return
              }
              toast.error("Logout to create a new account")
            }} />
          </div>

        </div>

        <img src={main} className='lg:w-[30%] w-[60%]' alt="" />
      </div>
    </>
  )
}


export default Intro
