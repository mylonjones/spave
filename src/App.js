import Home from './home'
import Navigation from './navigation'
import Production from './production'
import Composition from './composition'
import axios from 'axios'
import { useState, useEffect } from 'react'
import dummyData from './dummyData'

function App() {

  const [songs, setSongs] = useState({composition: [], production: []})

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
      <div className='pages'>
        <Production songs={songs.production} />
        <Home/>
        <Composition songs={songs.composition} />
      </div>
    </div>
  );
}

export default App;
