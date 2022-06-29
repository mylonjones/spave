import whiteStar from './images/whiteGlowStar.svg'
import whitePlay from './images/playWhite.svg'
import whitePause from './images/pauseWhite.svg'

import blackStar from './images/blackGlowStar.svg'
import blackPlay from './images/playBlack.svg'
import blackPause from './images/pauseBlack.svg'


import { useState, useRef, useEffect } from 'react'


const imports = {
  whiteStar,
  whitePlay,
  whitePause,
  blackStar,
  blackPlay,
  blackPause
}


export default function MusicStar(props) {



  const starRef = useRef()

  let [url, setUrl] = useState(imports[props.color + 'Star'])
  let [playing, setPlaying] = useState(false)
  const uniqueClass = 'musicStar' + props.number

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setUrl(imports[props.color + 'Star'])
          setPlaying(false)
          document.getElementById(uniqueClass).pause()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(starRef)

  function handleStarHover() {
    !playing && setUrl(imports[props.color + 'Play'])
  }

  function handleStarOut() {
    !playing && setUrl(imports[props.color + 'Star'])
  }

  function handleStarClick() {
    if(playing) {
      setUrl(imports[props.color + 'Play'])
      setPlaying(false)
      document.getElementById(uniqueClass).pause()
    } else {
      setUrl(imports[props.color + 'Pause'])
      setPlaying(true)
      document.getElementById(uniqueClass).play()
    }
  }

  function handleTimeUpdate(e) {
    var player = e.target
    var currentTime = player.currentTime;
    var duration = player.duration;
    if(currentTime === duration) {
      setPlaying(false)
      setUrl(imports[props.color + 'Play'])
    }
    var progress = document.getElementsByClassName('progress')[0]
    progress.style.width = (currentTime +.25)/duration*100+'%'

  }

  return(<div
    ref={starRef}
    className={`musicStar ${uniqueClass}`}
    onMouseEnter={handleStarHover}
    onMouseLeave={handleStarOut}
    onClick={handleStarClick}
    >
      <img className='musicStarImage' src={url} alt='musicPlayer' ></img>
      {url !== imports[props.color + 'Star'] && (<div className='progressBar' >
        <div className='progressPotential' >
        </div>
        <div className='progress' >
        </div>
        <div>{props.name}</div>
      </div>)}

      <audio id={uniqueClass} onTimeUpdate={handleTimeUpdate} >
        <source src={props.sound} type="audio/wav"/>
      </audio>
    </div>)
}