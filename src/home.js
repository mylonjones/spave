import star from './images/whiteStar.svg'
import glow from './images/whiteGlowStar.svg'
import { useState, useRef, useEffect } from 'react'




export default function Home() {

  let [url, setUrl] = useState(star)

  let [showAnswer, setShowAnswer] = useState(0)

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

  function handleStarClick(e) {
    setInfoContent(info)
  }

  function handleQuestionHover(e) {
    setShowAnswer(1)
  }

  function handleQuestionOut(e) {
    setShowAnswer(0)
  }


  return (<div className='home' >
    <div className='questionContainer' >
      <div
        className='whoAmI'
        onMouseEnter={handleQuestionHover}
        onMouseLeave={handleQuestionOut}
      >
        {`//WHO AM I?`}
        <span className='answer' style={{opacity: showAnswer}} >
          {intro}
        </span>
      </div>
    </div>
    <div
      className='landingStar'
      ref={starRef}
      onMouseEnter={handleStarHover}
      onMouseLeave={handleStarOut}
      onClick={handleStarClick}
    >{(infoContent && <div style={{paddingTop: '10px'} }>{infoContent}</div>) ||<div className='homeStarContainer'>
        <img className='homeStar' src={url} alt='star'></img>
        <div className='starGlow' ></div>
      </div>}</div>
  </div>)
}