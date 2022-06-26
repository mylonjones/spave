import logo from './images/whiteLogo.png'
import MusicStar from './musicStar'

import sound from './images/ICE CAVE.wav'


export default function Production() {

  return(
    <div className='production' >
      <div className='whiteStarBackground' >
        <div className='musicStars' >
          <MusicStar
            name={'//ICE CAVE'}
            sound={sound}
            number='White1'
            color='white'
            />
          <MusicStar
            name={'//ICE CAVE'}
            sound={sound}
            number='White2'
            color='white'
            />
        </div>
        <div className='pageLogo' >
          <img src={logo} alt='logo' ></img>
        </div>
      </div>
    </div>
  )
}