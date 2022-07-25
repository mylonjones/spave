import Home from './home'
import Navigation from './navigation'
import Production from './production'
import Composition from './composition'
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {

  const [songs, setSongs] = useState({composition: [], production: []})

  useEffect(() => {
    // let data = {production: [{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"}], composition: [{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"}]}
    // setSongs(data)
    axios.get('/files')
      .then(res => {
        setSongs(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  function parallax(e) {
    var starParallaxX = (e.pageX / -90)
    var starParallaxY = (e.pageY / -90)
    var constParallaxX = (e.pageX / -180)
    var constParallaxY = (e.pageY / -180)
    document.getElementsByClassName('parallaxBackground')[0].style.backgroundPosition = starParallaxX + 'px ' + starParallaxY + 'px'
    document.getElementsByClassName('parallaxBackground')[1].style.backgroundPosition = starParallaxX + 'px ' + starParallaxY + 'px'
    document.getElementsByClassName('starBackground')[0].style.backgroundPosition = constParallaxX + 'px ' + constParallaxY + 'px'
    document.getElementsByClassName('starBackground')[1].style.backgroundPosition = constParallaxX + 'px ' + constParallaxY + 'px'
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
