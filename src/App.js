import Home from './home'
import Navigation from './navigation'
import Production from './production'
import Composition from './composition'
import axios from 'axios'
import { useState, useEffect } from 'react'
import dummyData from './dummyData'

function App() {

  const [songs, setSongs] = useState({composition: [], production: []})

  const [touchDown, setTouchDown] = useState(0)
  const [touchUp, setTouchUp] = useState(0)

  function handleTouchStart(e) {
    setTouchDown(e.targetTouches[0].clientX)
  }

  function handleTouchMove(e) {
    setTouchUp(e.targetTouches[0].clientX)
  }

  function handleTouchEnd() {
    let swipe = 'none'
    if (touchDown - touchUp > 50) {
      swipe = 'left'
    }

    if (touchDown - touchUp < -50) {
      swipe = 'right'
    }

    if(touchUp === 0) {
      swipe = 'none'
    }

    if (swipe !== 'none') {

      const pages = document.getElementsByClassName('pages')[0]

      const nav = document.getElementsByClassName('navbar')[0]

      const shadow = document.getElementsByClassName('shadow')

      function shadowColor(color) {
        for(let i = 0; i < shadow.length; i++) {
          shadow[i].style.color = color
        }
      }

      let position = '-100vw'

      let target = 'apollos'

      switch(document.getElementsByClassName('active')[0].id) {
        case 'apollos':
          if (swipe === 'left') target = 'composition'
          if (swipe === 'right') target = 'production'
          break
        case 'production':
          if (swipe === 'left') target = 'apollos'
          if (swipe === 'right') target = 'production'
          break
        case 'composition':
          if (swipe === 'left') target = 'composition'
          if (swipe === 'right') target = 'apollos'
          break
        default:
          break
      }

      document.getElementsByClassName('showStars')[0] && document.getElementsByClassName('showStars')[0].classList.remove('showStars')
      document.getElementsByClassName('active')[0].classList.remove('active')

      switch(target) {
        case 'production':
          position = '0'
          document.getElementsByClassName('starBackground')[0].classList.add('showStars')
          document.getElementById('production').classList.add('active')
          nav.style.color = 'white'
          shadowColor('#dbdbdb')
          break
        case 'apollos':
          position = '-100vw'
          nav.style.color = 'white'
          document.getElementById('apollos').classList.add('active')
          shadowColor('#dbdbdb')
          break
        case 'composition':
          position = '-200vw'
          nav.style.color = 'black'
          document.getElementsByClassName('starBackground')[1].classList.add('showStars')
          document.getElementById('composition').classList.add('active')
          shadowColor('#373737')
          break
          default:
            break
      }

      pages.style.transform = `translateX(${position})`
    }

    setTouchDown(0)
    setTouchUp(0)
  }

  useEffect(() => {
    if(process.env.NODE_ENV === 'production') {
      axios.get('/files')
        .then(res => {
          setSongs(res.data)
          console.log(res.data)
        })
        .catch(error => console.log(error))
    } else {
      setSongs(dummyData)
    }
  }, [])

  function parallax(e) {
    let starParallaxX = (e.pageX / -90)
    let starParallaxY = (e.pageY / -90)
    let constParallaxX = (e.pageX / -180)
    let constParallaxY = (e.pageY / -180)
    let offset = window.innerWidth * .75
    document.getElementsByClassName('parallaxBackground')[0].style.backgroundPosition = `${starParallaxX}px ${starParallaxY}px`
    document.getElementsByClassName('parallaxBackground')[1].style.backgroundPosition = `${starParallaxX}px ${starParallaxY}px`
    document.getElementsByClassName('starBackground')[0].style.backgroundPosition = `${constParallaxX}px ${constParallaxY}px`
    document.getElementsByClassName('starBackground')[1].style.backgroundPosition = `${constParallaxX}px ${constParallaxY}px`
    document.getElementsByClassName('peekingStars')[0].style.backgroundPosition = `${starParallaxX - offset}px ${starParallaxY}px, ${starParallaxX + offset}px ${starParallaxY}px`
  }

  return (
    <div className="app" onMouseMove={parallax} >
      <Navigation />
      <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className='pages'
      >
        <Production songs={songs.production} />
        <Home/>
        <Composition songs={songs.composition} />
      </div>
    </div>
  );
}

export default App;
