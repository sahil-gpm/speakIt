import axios from 'axios'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { usercontext } from '../context/Usercontext'

const Leaderboard = () => {

    const { token } = useContext(usercontext)
    const [leaderBoard, setLeaderBoard] = useState([])

    const getAllUsers = useCallback(async () => {
        try {
            const response = await axios.post(process.env.REACT_APP_GET_USER_PROGRESSES)
            if (response.data.success) {
                setLeaderBoard(response.data.leaderBoard)
            }
        } catch (e) {
            toast.error("Network connectivity issue")
        }
    }, [])

    useEffect(() => {
        getAllUsers()
    }, [getAllUsers])

    return (
        <>
            {token && <div className='progress-wrapper w-[73%] mx-auto mt-[10%]'>

                <div className="heading text-2xl lg:text-5xl font-bold">
                    Leaderboard 💪
                </div>

                {leaderBoard?.map((leader) => {
                    return (
                        <div className='leader-tile my-6 bg-bg_light px-6 py-7 rounded-md lg:w-[86%] w-full'>
                            <div className="leader-email font-semibold">
                                {leader.email}  <span className='text-text_start'>{leader.progress}%</span>
                            </div>

                            {/* showing progress  */}
                            <div className={`outer w-full h-2 bg-text_light rounded-3xl`}>
                                <div className={`inner h-full bg-text_start rounded-l-3xl mt-2`} style={{ width: leader.progress + "%" }}></div>
                            </div>
                        </div>
                    )
                })}

            </div>}
        </>
    )
}

export default Leaderboard
