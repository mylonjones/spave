import whiteStar from './images/whiteGlowStar.svg'
import whitePlay from './images/playWhite.svg'
import whitePause from './images/pauseWhite.svg'
import whiteGlow from './images/C3B131ED.png'


import blackStar from './images/blackGlowStar.svg'
import blackPlay from './images/playBlack.svg'
import blackPause from './images/pauseBlack.svg'
import blackGlow from './images/D7887273.png'


import { useState, useRef, useEffect } from 'react'


const imports = {
  whiteStar,
  whitePlay,
  whitePause,
  whiteGlow,
  blackStar,
  blackPlay,
  blackPause,
  blackGlow
}


export default function MusicStar(props) {



  const starRef = useRef()

  let [url, setUrl] = useState(imports[props.color + 'Star'])
  let [playing, setPlaying] = useState(false)
  let [showProgress, setShowProgress] = useState('none')
  const uniqueClass = 'musicStar' + props.number

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setUrl(imports[props.color + 'Star'])
          setPlaying(false)
          setShowProgress('none')
          document.getElementById(uniqueClass + props.name).pause()
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
    !playing && setShowProgress('none')
    !playing && setUrl(imports[props.color + 'Star'])
  }

  function handleStarClick() {
    if(playing) {
      setUrl(imports[props.color + 'Play'])
      setPlaying(false)
      document.getElementById(uniqueClass + props.name).pause()
    } else {
      setUrl(imports[props.color + 'Pause'])
      setShowProgress('block')
      setPlaying(true)
      document.getElementById(uniqueClass + props.name).play()
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
    var progress = document.getElementsByClassName('progressMarker')[0]
    progress.style.left = (currentTime +.25)/duration*120-9+'px'

  }

  return(<div
    ref={starRef}
    className={`musicStar ${uniqueClass}`}
    onMouseEnter={handleStarHover}
    onMouseLeave={handleStarOut}
    onClick={handleStarClick}
    >
      <div className='glowContainer' >
        <img className='musicStarImage' src={url} alt='musicPlayer' ></img>
        <div className='starGlow' style={{ backgroundImage: `url(${imports[props.color + 'Glow']})` }} ></div>
      </div>
      {url !== imports[props.color + 'Star'] && (<div className='progressBar' >
        <div className='progress' style={{display: showProgress}}>
          <div className='progressMarker' >
          </div>
        </div>
        <div className='title' >{props.name}</div>
      </div>)}

      <audio id={uniqueClass + props.name} onTimeUpdate={handleTimeUpdate} >
        <source src={props.sound} type="audio/wav"/>
      </audio>
    </div>)
}