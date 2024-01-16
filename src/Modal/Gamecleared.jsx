import React from 'react'
import Button from '../helpers/Button'
import {motion } from 'framer-motion'

const Gamecleared = ({ msg,des,onContinue }) => {
    return (
        <motion.div initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1,delay:.2}} className='logout-modal-wrapper p-20 absolute top-[10%] left-[5%] md:left-[25%] rounded-3xl shadow-theme w-[90%] md:w-[50%] bg-white shadow-xl'>
            <div className="heading text-sub text-xl lg:text-3xl text-center font-extrabold">
                {msg}
            </div>
            
            <div className="description w-[90%] lg:w-[50%] text-center mx-auto mt-6 text-base font-semibold">
                {des}
            </div>

            <div className="btn-choices flex justify-center items-center gap-5 mt-8">
                <Button onClick={onContinue} text={"Continue"} textColor={"white"} backgroundColor={"crimson"} width={130} borderRadius={7} padding={10} />
            </div>
        </motion.div>
    )
}

export default Gamecleared
