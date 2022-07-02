import Home from './home'
import Navigation from './navigation'
import Production from './production'
import Composition from './composition'
import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {

  const [songs, setSongs] = useState([])

  useEffect(() => {
    // let data = [{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"},{"name":"ICE CAVE","file":"ICE_CAVE_gxyhiy.wav"}]
    // setSongs(data)
    axios.get('/files')
      .then(res => {
        setSongs(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="app">
      <Navigation />
      <div className='pages'>
        <Production songs={songs} />
        <Home/>
        <Composition songs={songs} />
      </div>
    </div>
  );
}

export default App;
