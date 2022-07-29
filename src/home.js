import url from './images/whiteStar.svg'
import { useState, useRef, useEffect } from 'react'




export default function Home() {

  let [Opacity, setOpacity] = useState(0)

  let star = useRef()
  let contactInfo = useRef()



  const starRef = useRef()

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          star.current.style.opacity = 1
          contactInfo.current.style.opacity = 0
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(starRef)

  function handleStarClick() {
    star.current.style.opacity = 0
    contactInfo.current.style.opacity = 1
  }

  function handleQuestionHover() {
    setOpacity(1)
  }

  function handleQuestionOut() {
    setOpacity(0)
  }


  return (<div className='home' >
    <div className='peekingStars' ></div>
    <div className='homeContainer' >
      <div className='questionContainer' >
        <div
          className='whoAmI'
          onMouseEnter={handleQuestionHover}
          onMouseLeave={handleQuestionOut}
        >
          {`//WHO AM I?`}
          <span className='answer' style={{opacity: Opacity}} >
            {'\nI AM APOLLOS\nTHIS IS MY WORK\nCLICK THE STARS\nINQUIRE.'}
          </span>
        </div>
      </div>
      <div
        className='landingStar'
        ref={starRef}
        onClick={handleStarClick}
      >
        <div ref={star} className='homeStarContainer'>
          <img className='homeStar' src={url} alt='star'></img>
          <div className='starGlow' ></div>
        </div>
        <div ref={contactInfo} className='contactInfo' >
          {`APOLLOSPRODUCTIONS1@GMAIL.COM\n@AIDENSTROZZI`}
        </div>
      </div>
    </div>
  </div>)
}