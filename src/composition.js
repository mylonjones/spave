import logo from './images/blackLogo.png'
import MusicStar from './musicStar'

import sound from './images/ICE CAVE.wav'


export default function Composition() {

  return(
    <div className='composition' >
      <div className='blackStarBackground' >
        <div className='musicStars' >
          <MusicStar
            name={'//ICE CAVE'}
            sound={sound}
            number='Black1'
            color='black'
            />
          <MusicStar
            name={'//ICE CAVE'}
            sound={sound}
            number='Black2'
            color='black'
            />
        </div>
        <div className='pageLogo' >
          <img src={logo} alt='logo' ></img>
        </div>
      </div>
    </div>
  )
}