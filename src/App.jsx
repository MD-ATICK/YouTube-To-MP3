import './App.css'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { PulseLoader } from 'react-spinners'


function App() {

  const [Loading, setLoading] = useState(false);
  const [LinkYT, setLinkYT] = useState('');
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
      <h1 className='text-[30px] md:text-[35px] font-[500]'>YouTube to MP3 Converter</h1>
      <p className='text-[15px] md:text-[14px] py-4 mb-3 font-[400] leading-7 tracking-wide text-center'>Tranforms your choose youtube video to Mp3. We want you be Happy.</p>
      <input value={LinkYT} onChange={(e) => setLinkYT(e.target.value)} type="text" className='mt-6 text-[15px] rounded-md py-3 px-4 font-sans tracking-wide font-[500] placeholder:text-stone-500 text-black outline-none w-[350px]' placeholder='Enter a YouTube Url ...' />
      <button onClick={SearchHanlder} className='bg-sky-700 py-3 px-8 rounded-lg outline-none shadow-sm shadow-white hover:scale-105 duration-150 mt-8' >Search</button>
      {Loading ? <div className='mt-12' ><PulseLoader color='white' /> </div> : urlResult && <a target='_blank' rel='noreferrer' href={urlResult} className=' underline font-sans tracking-wide mt-12'>Download MP3</a>}
    </div>
  )
}

export default App
