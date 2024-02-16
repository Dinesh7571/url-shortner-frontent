import React, { useEffect,useState } from 'react'
import axios from 'axios'
import copy from './assets/copy.png'
import paste from './assets/paste.png'
const App = () => {
const [err, seterr] = useState('')
  const [url, setUrl] = useState('')
  const [shortId, setShortId] = useState('')
  const [isloading, setIsloading] = useState(false)
  const handleShortUrl=()=>{
    setIsloading(true)
    axios.post('https://urlsh-gppa.onrender.com/url', { url })
    .then(response => {
        setShortId(response.data.id)
        console.log(response.data)
        setIsloading(false)
    })
    .catch(error => {
      setIsloading(false)
      seterr(error)
      console.error('Error during POST request:', error);
    });
  }
    
  
  const pasteFunction = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (error) {
      console.error('Paste failed', error);
    }
  };

  const copyFunction = async () => {
    try {
      await navigator.clipboard.writeText(`https://urlsh-gppa.onrender.com/${shortId}`);
      console.log('URL copied to clipboard');
    } catch (error) {
      console.error('Copy failed', error);
    }
  };
    
 
  
  return (
    <div className='main'>
 
    <form className='form'>
    <h3>SHORT YOUR LONG URL</h3>
      <div className='enterurl'>
        <input
          className='input'
          placeholder='Paste your url'
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <img src={paste} alt="vite" className='icon' onClick={pasteFunction}  />
      
      </div>


      {shortId && (
        <div className='enterurl' >
          <input
           
            className='input '
            value={`https://urlsh-gppa.onrender.com/${shortId}`}
          />
        <img src={copy} alt="vite" className='icon' onClick={copyFunction}  />
       
        </div>
      )}
      {err&& <em>{err}</em>}
      <input
        className=' button'
        type="button"
        onClick={handleShortUrl}
        value={isloading?'Wait':'short url'}
      />
      
    </form>
  </div>
  )
}

export default App