import logo from './images/whiteLogo.png'
import star from './images/whiteGlowStar.svg'

export default function Production() {

  return(
    <div className='production' >
      <div className='whiteStarBackground' >
        <div className='whiteMusicStars' >
          <div className='musicStar musicStar1' >
            <img className='musicStarImage' src={star} alt='musicPlayer' ></img>

          </div>
        </div>
        <div className='whiteLogo' >
          <img src={logo} alt='logo' ></img>
        </div>

      </div>
    </div>
  )
}