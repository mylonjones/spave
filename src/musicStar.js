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
  const progressBar = useRef()


  let [fading, setFading] = useState(false)
  let [playing, setPlaying] = useState(false)
  let [showProgress, setShowProgress] = useState(0)
  let [loadSong, setLoad] = useState(false)
  let [hovering, setHovering] = useState(false)
  let [touches, setTouches] = useState(0)
  let [imageOpacities, setOpacities] = useState({ star: 1, play: 0, pause:0 })
  let [titleOpacity, setTitle] = useState(0)


  const uniqueClass = 'musicStar' + props.number

  function show(img) {

    let opacities = {star: 1, play: 0, pause: 0}

    switch(img) {
      case 'play':
        opacities = {star: 0, play: 1, pause: 0}
        break;
      case 'pause':
        opacities = {star: 0, play: 0, pause: 1}
        break;
      default:
        opacities = {star: 1, play: 0, pause: 0}
    }

    setOpacities(opacities)
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {

        if (loadSong && ref.current && !ref.current.contains(event.target)) {
          setTouches(0)
          show('star')
          setTitle(0)
          setPlaying(false)
          setShowProgress(0)
          document.getElementById(uniqueClass + props.name).pause()
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, loadSong]);
  }
  useOutsideAlerter(starRef)

  useEffect(() => {
    if(loadSong) {
      let player = document.getElementById(uniqueClass + props.name)
      player.volume = 0
    }
  }, [uniqueClass, props.name, loadSong])


  function handleStarHover() {
    !playing && show('play')
    setTitle(1)
    setLoad(true)
  }

  function handleStarOut() {
    !playing && setShowProgress(0)
    !playing && show('star')
    !playing && setTitle(0)
  }

  function handleTouch (e) {
    setTouches(touches + 1)
  }

  function handleStarClick() {
    if(touches !== 1) {
      if(playing) {
        show('play')
        setPlaying(false)
        document.getElementById(uniqueClass + props.name).pause()
      } else {
        show('pause')
        setShowProgress(1)
        setPlaying(true)
        document.getElementById(uniqueClass + props.name).play()
      }
    }
  }

  function handleTimeUpdate(e) {
    var player = e.target
    var currentTime = player.currentTime;
    var duration = player.duration;

    if(playing && !hovering) {
      let width = progressBar.current.offsetWidth
      if(currentTime === duration) {
        setPlaying(false)
        show('play')
      }
      var progress = document.getElementsByClassName(`progressMarker${uniqueClass}`)[0]
      progress.style.left = (currentTime +.25)/duration*width-9+'px'
    }

    function fadeIn() {
      setFading(true)
      player.volume = 0
      let fadeInInverval = setInterval(() => {
        if(player.volume < .99) {
          player.volume += 0.1
        } else {
          setFading(false)
          clearInterval(fadeInInverval)
        }
      }, 100);
    }

    function fadeOut() {
      setFading(true)
      let fadeInInverval = setInterval(() => {
        if(player.volume >= 0.1) {
          player.volume -= 0.1
        } else {
          setFading(false)
          clearInterval(fadeInInverval)
        }
      }, 100);
    }

    if(!fading && currentTime < 1) {
      fadeIn()
    } else if(!fading && currentTime > duration - 1) {
      fadeOut()
    }
  }

  function handleProgressHover() {
    setHovering(true)
  }

  function handleProgressExit() {
    setHovering(false)
  }

  function handleProgressMouseMove(e) {
    let left = parseInt(getComputedStyle(document.getElementsByClassName(uniqueClass)[0]).left)
    let width = document.getElementsByClassName(`progress${uniqueClass}`)[0].offsetWidth
    if(left + width > e.clientX - 45 && left < e.clientX - 45) {
      let position = e.clientX - left - 60 + 'px'
      var progress = document.getElementsByClassName(`progressMarker${uniqueClass}`)[0]
      progress.style.left = position
    }
  }

  function handleProgressClick(e) {
    e.stopPropagation()
    let player = document.getElementById(uniqueClass + props.name)
    let position = (e.clientX - document.getElementsByClassName(`progress${uniqueClass}`)[0].getBoundingClientRect().left) / document.getElementsByClassName(`progress${uniqueClass}`)[0].offsetWidth
    let duration = player.duration
    player.currentTime = duration * position
    setHovering(false)
  }

  return(<div
    ref={starRef}
    className={`musicStar ${uniqueClass}`}
    onMouseEnter={handleStarHover}
    onMouseLeave={handleStarOut}
    onClick={handleStarClick}
    onTouchStart={handleTouch}
    >
      <div className='glowContainer' >
        <img className='musicStarImage'
             src={imports[props.color + 'Star']}
             style={{opacity: imageOpacities.star}}
             alt='musicPlayer' ></img>
        <img className='musicStarImage imgLayer'
             style={{opacity: imageOpacities.play}}
             src={imports[props.color + 'Play']}
             alt='musicPlayer' ></img>
        <img className='musicStarImage imgLayer'
             style={{opacity: imageOpacities.pause}}
             src={imports[props.color + 'Pause']}
             alt='musicPlayer' ></img>
        <div className='starGlow' style={{ backgroundImage: `url(${imports[props.color + 'Glow']})` }} ></div>
      </div>
      <div className='progressBar'
      ref={progressBar}
      >
        <div
          className={`progress progress${uniqueClass}`}
          onClick={handleProgressClick}
          onMouseEnter={handleProgressHover}
          onMouseLeave={handleProgressExit}
          onMouseMove={handleProgressMouseMove}
          style={{opacity: showProgress}}>
          <div className={`progressMarker progressMarker${uniqueClass}`} >
          </div>
        </div>
        <div className='title'
             style={{opacity: titleOpacity}}>{props.name}</div>
      </div>

      {loadSong && <audio id={uniqueClass + props.name} onTimeUpdate={handleTimeUpdate} >
        <source src={props.sound} type="audio/wav"/>
        {}
      </audio>}
    </div>)
}