import React, { useCallback, useContext, useEffect } from 'react'
import Intro from './Intro'
import axios from 'axios'
import { usercontext } from '../context/Usercontext'
import toast from 'react-hot-toast'
import Progress from './Progress'
import Leaderboard from './Leaderboard'


const Home = () => {

  const { setUserData, setToken } = useContext(usercontext)

  const fetchUserData = useCallback(async() => {
    try {
      const response = await axios.post(process.env.REACT_APP_GET_USER_DATA ,{}, {
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('auth')
        }
      })

      if (response.data !== null) {
        setUserData(response.data.user)
        setToken(localStorage.getItem('auth'))
      }

    } catch (e) {
      toast.error("Login to your account")
    }
  },[setToken,setUserData])

  useEffect(()=>{
    fetchUserData()
  },[fetchUserData])

  return (
    <div className='py-10'>
      <Intro />
      <Progress/>
      <Leaderboard/>
    </div>
  )
}

export default Home
