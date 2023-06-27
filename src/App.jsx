import './App.css'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { PulseLoader } from 'react-spinners'


function App() {

  const [Loading, setLoading] = useState(false);
  const [LinkYT, setLinkYT] = useState('https://youtu.be/oGg3kzoR6lw');
  const [urlResult, seturlResult] = useState('');

  const SearchHanlder = async () => {
    const YoutubeID = LinkYT.split('https://youtu.be/')[1]
    console.log(YoutubeID)
    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: { id: YoutubeID },
      headers: {
        'X-RapidAPI-Key': '3916d7def5msh38e3cd7ab3fcd44p122dbejsn006a341afe40',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    };

    try {
      setLoading(true)
      const { data } = await axios(options)
      console.log(data)
      setLoading(false)
      seturlResult(data.link)
    } catch (error) {
      console.log(error)
      // window.location.reload()
    }
  }

  return (
    <div className=' h-screen flex flex-col text-white justify-center items-center p-10 md:p-14 w-full bg-pink-800'>
      <h1 className='text-[25px] md:text-[35px] font-[500]'>YouTube to MP3 Converter</h1>
      <p className='text-[13px] md:text-[14px] font-[400] leading-7 tracking-wide text-center'>Lorem sit sicing elit. atick vai Quasi dicta optio sed omnis iste.</p>
      <input value={LinkYT} onChange={(e) => setLinkYT(e.target.value)} type="text" className='mt-6 text-[15px] rounded-md py-2 px-4 font-sans tracking-wide font-[500] placeholder:text-stone-500 text-black outline-none w-[400px]' placeholder='Enter a YouTube Url ...' />
      <button onClick={SearchHanlder} className='bg-sky-800 py-2 px-6 rounded-md outline-none shadow-sm shadow-white hover:scale-105 duration-150 mt-4' >Search</button>
      {Loading ? <div className='mt-10' ><PulseLoader color='white' /> </div> : urlResult && <a target='_blank' rel='noreferrer' href={urlResult} className=' underline font-sans tracking-wide mt-10'>Download MP3</a>}
    </div>
  )
}

export default App
