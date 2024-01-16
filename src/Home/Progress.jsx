import React, { useContext } from 'react'
import { usercontext } from '../context/Usercontext'
const Progress = () => {

    const { userData, token } = useContext(usercontext)

    return (
        <>
            {token && <div className='progress-wrapper w-[73%] mx-auto mt-[20%]'>
                <div className="heading text-2xl lg:text-5xl font-bold">
                    Your current progress ↴
                </div>


                {/* showing current/recent progress in several languages  */}

                <div className="hindi-progress my-10">
                    <label className='text-xl font-bold'>Hindi {userData.hindi}%</label>

                    {/* for showing progress bar  */}
                    <div className={`outer w-[85%] h-2 bg-text_light rounded-3xl`}>
                        <div className={`inner h-full bg-text_start rounded-l-3xl mt-2`} style={{width:userData.hindi + "%"}}></div>
                    </div>
                </div>


                <div className="english-progress my-10">
                    <label className='text-xl font-bold'>English {userData.english}%</label>

                    {/* for showing progress bar  */}
                    <div className={`outer w-[85%] h-2 bg-text_light rounded-3xl`}>
                        <div className={`inner h-full bg-text_end rounded-l-3xl mt-2`} style={{width:userData.english + "%"}}></div>
                    </div>
                </div>


                <div className="french-progress my-10">
                    <label className='text-xl font-bold'>French {userData.french}%</label>

                    {/* for showing progress bar  */}
                    <div className={`outer w-[85%] h-2 bg-text_light rounded-3xl`}>
                        <div className={`inner h-full bg-card rounded-l-3xl mt-2`} style={{width:userData.french + "%"}}></div>
                    </div>
                </div>


                <div className="german-progress my-10">
                    <label className='text-xl font-bold'>German {userData.german}%</label>

                    {/* for showing progress bar  */}
                    <div className={`outer w-[85%] h-2 bg-text_light rounded-3xl`}>
                        <div className={`inner h-full bg-sub rounded-l-3xl mt-2`} style={{width:userData.german + "%"}}></div>
                    </div>
                </div>


                <div className="german-progress my-10">
                    <label className='text-xl font-bold'>Overall progress {(userData.hindi + userData.english + userData.french + userData.german)/2}%</label>

                    {/* for showing progress bar  */}
                    <div className={`outer w-[85%] h-2 bg-text_light rounded-3xl`}>
                        <div className={`inner h-full bg-black rounded-l-3xl mt-2`} style={{width:(userData.hindi + userData.english + userData.french + userData.german)/2 + "%"}}></div>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Progress
