import star from './images/whiteStar.svg'
import glow from './images/whiteGlowStar.svg'
import { useState, useRef, useEffect } from 'react'




export default function Home() {

  let [url, setUrl] = useState(star)

  let [answer, setAnswer] = useState('')

  let [infoContent, setInfoContent] = useState(null)

  const starRef = useRef()

  let intro = '\nI AM APOLLOS\nTHIS IS MY WORK\nCLICK THE STARS\nINQUIRE.'

  let info = `APOLLOSPRODUCTIONS1@GMAIL.COM\n@AIDENSTROZZI`

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setInfoContent(null)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(starRef)

  function handleStarHover(e) {
    setUrl(glow)
  }

  function handleStarOut(e) {
    setUrl(star)
  }

  function handleStarClick() {
    setInfoContent(info)
  }

  function handleQuestionHover(e) {
    setAnswer(intro)
  }

  function handleQuestionOut(e) {
    setAnswer('')
  }


  return (<div className='home' >
    <div className='questionContainer' >
      <div
        className='whoAmI'
        onMouseEnter={handleQuestionHover}
        onMouseLeave={handleQuestionOut}
      >
        {`//WHO AM I?${answer}`}
      </div>
    </div>
    <div
      className='landingStar'
      ref={starRef}
      onMouseEnter={handleStarHover}
      onMouseLeave={handleStarOut}
      onClick={handleStarClick}
    >{infoContent || <img className='homeStar' src={url} alt='star'></img>}</div>
  </div>)
}