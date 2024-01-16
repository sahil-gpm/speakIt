import React, { useContext, useState } from 'react'
import Button from '../helpers/Button'
import { motion } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import { usercontext } from '../context/Usercontext'

const Login = ({ onCancel }) => {

    const { setToken } = useContext(usercontext)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const logIn = async () => {
        if (!email || !password) {
            toast.error("Add all required fields")
            return
        }

        if (email.length < 6 || password.length < 3) {
            toast.error("Invalid field lengths")
            return
        }

        setLoading(true)
        try {
            const response = await axios.post(process.env.REACT_APP_LOGIN, { email: email, password: password })
            if (response.data.success) {
                localStorage.setItem("auth", response.data.authtoken)
                setLoading(false)
                toast.success("Logged into account")
                setToken(response.data.authtoken)
                onCancel()
            }
        } catch (e) {
            setLoading(false)
            toast.error("Login failed")
        }
    }


    return (
        <motion.div animate={{ y: -20 }} transition={{ duration: 0.6, easings: true, delay: .01 }} className='login-wrapper xl:w-[40%] w-[90%] absolute top-[20%] xl:left-[30%] shadow-lg p-14 lg:p-16 rounded-lg bg-white'>

            <div className="heading mt-5 text-2xl md:text-4xl font-bold text-start">
                Log into account
            </div>

            <div className="form mt-5 mb-10">
                <input type="email"
                    placeholder='Email - must be 7 characters'
                    className='rounded-full border-[1.2px] border-black text-slate-500 text-sm py-2 px-5 w-full mt-4 outline-none'
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password"
                    placeholder='Password - must be 3 characters'
                    className='rounded-full border-[1.2px] border-black text-slate-500 text-sm py-2 px-5 w-full mt-4 outline-none'
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='flex justify-start gap-4'>
                <Button text={"Cancel"} textColor={"white"} backgroundColor={"crimson"} width={150} padding={7} borderRadius={6} onClick={onCancel} />
                <Button text={loading ? "Logging..." : "Continue"} textColor={"white"} backgroundColor={"black"} width={150} padding={7} borderRadius={6} onClick={logIn} />
            </div>

        </motion.div>
    )
}

export default Login
