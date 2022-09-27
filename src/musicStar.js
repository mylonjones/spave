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
  const progressMarker = useRef()
  const player = useRef()


  let [fading, setFading] = useState(false)
  let [playing, setPlaying] = useState(false)
  let [showProgress, setShowProgress] = useState(0)
  let [loadSong, setLoad] = useState(false)
  let [mouseDown, setMouseDown] = useState(false)
  let [touches, setTouches] = useState(0)
  let [imageOpacities, setOpacities] = useState({ star: 1, play: 0, pause:0 })
  let [titleOpacity, setTitle] = useState(0)
  let [Xposition, setXposition] = useState(0)


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
          player.current.pause()
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
      player.current.volume = 0
    }
  }, [loadSong])


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
        player.current.pause()
      } else {
        show('pause')
        setShowProgress(1)
        setPlaying(true)
        player.current.play()
      }
    }
  }

  function handleTimeUpdate(e) {
    let currentTime = player.current.currentTime;
    let duration = player.current.duration;

    if(playing && !mouseDown) {
      let width = progressBar.current.offsetWidth
      progressMarker.current.style.left = currentTime * width / duration - 14 + 'px'
      if(currentTime === duration) {
        setPlaying(false)
        show('play')
      }
    }

    function fade(fadeIn) {
      setFading(true)
      let fadeInInverval = setInterval(() => {
        if(fadeIn && player.current.volume < .99) {
          player.current.volume += 0.1
        } else if(!fadeIn && player.current.volume >= 0.1) {
          player.current.volume -= 0.1
        } else {
          setFading(false)
          clearInterval(fadeInInverval)
        }
      }, 100);
    }
    if(!fading && currentTime < 1) {
      fade(true)
    } else if(!fading && currentTime > duration - 1) {
      fade(false)
    }
    if(currentTime > 1 && currentTime < duration -1) {
      player.current.volume = 1
    }
  }

  function handleMouseDown() {
    setMouseDown(true)
  }

  function handleMouseUp() {
    setMouseDown(false)
  }



  function handleProgressMouseMove(e) {

    if(mouseDown) {
      setXposition(e.clientX || e.touches[0].clientX)
      let relativeX = Xposition - progressBar.current.getBoundingClientRect().left
      if(progressBar.current.offsetWidth > relativeX && 0 < relativeX) {
        e.target.style.left = relativeX - 14 + 'px'
        //4 for radius of progress bar and 10 for radius of progress marker
      }
    }
  }

  function handleProgressClick(e) {
    e.stopPropagation()
    let position = Xposition - e.currentTarget.getBoundingClientRect().left
    let width = e.currentTarget.offsetWidth
    player.current.currentTime = player.current.duration * position / width
    setMouseDown(false)
  }

  return(<div
    ref={starRef}
    className={`musicStar ${uniqueClass}`}>
      <div className='glowContainer'
           onMouseEnter={handleStarHover}
           onMouseLeave={handleStarOut}
           onClick={handleStarClick}
           onTouchStart={handleTouch}>
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
      <div className='progressBar' >
        <div className={`progress`}
             ref={progressBar}
             onTouchEnd={handleProgressClick}
             onClick={handleProgressClick}
             onMouseMove={handleProgressMouseMove}
             onTouchMove={handleProgressMouseMove}
             style={{opacity: showProgress}}>
          <div className={`progressMarker`}
               ref={progressMarker}
               onMouseDown={handleMouseDown}
               onTouchStart={handleMouseDown}
               onMouseLeave={handleMouseUp}
               onMouseUp={handleMouseUp}
               onTouchEnd={handleMouseUp} >
          </div>
        </div>
        <div className='title'
             style={{opacity: titleOpacity}}>{props.name}</div>
      </div>

      {loadSong && <audio
        className='player'
        ref={player}
        onTimeUpdate={handleTimeUpdate} >
        <source src={props.sound} type="audio/wav"/>
      </audio>}
    </div>)
}