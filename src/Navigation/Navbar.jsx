import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usercontext } from '../context/Usercontext'
import Logoutmodal from '../Modal/Logoutmodal'
import Login from '../auth/Login'

const Navbar = () => {

    const navigate = useNavigate("/")
    const { token, setToken } = useContext(usercontext)
    const [logout, setLogout] = useState(false)
    const [login, setLogin] = useState(false)

    return (
        <div className='h-[6vh] w-full flex justify-between items-center px-5 lg:px-16 pt-1 shadow-md'>

            {/* popup for logout modal  */}
            {logout && <Logoutmodal
                msg={"Sure to continue logout"}
                onContinue={() => {
                    setToken("") //setting the token as empty
                    localStorage.setItem("auth", "") //clearing the localstorage
                    window.location.reload()
                }}
                onCancel={() => setLogout(false)} />}

            {/* popup for login modal  */}
            {login && <Login onCancel={()=>{setLogin(false)}}/>}


            <div className="main text-lg md:text-2xl font-bold bg-gradient-to-tr from-text_start to-text_end text-trans bg-clip-text cursor-pointer"
                onClick={() => {
                    navigate("/")
                }}>
                Speakit
            </div>

            <div className='flex justify-center gap-5 lg:gap-10 text-sm md:text-md font-semibold'>
                {token && <button className="profile cursor-pointer hover:text-text_start transition-all duration-300"
                    onClick={() => {
                        setLogout(true)
                    }}>
                    Logout
                </button>}

                {!token && <button className="profile cursor-pointer hover:text-text_start transition-all duration-300"
                    onClick={() => {
                        setLogin(true)
                    }}>
                    Login
                </button>}
            </div>

        </div>
    )
}

export default Navbar
