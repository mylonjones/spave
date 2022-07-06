import logo from './images/blackLogo.png'
import MusicStar from './musicStar'

const url = 'https://res.cloudinary.com/dzgsesdip/video/upload/v1656525394/composition/'

export default function Composition(props) {

  return(
    <div className='composition' >
      <div className='blackStarBackground' >
        <div className='musicStars' >
          {props.songs.map((song, index) => {
            index = index + 1
            return (
              <MusicStar
            name={'//' + song.name}
            key={index}
            sound={url + song.file}
            number={'Black' + index}
            color='black'
            />
            )
          })}
        </div>
        <div className='pageLogo' >
          <img src={logo} alt='logo' ></img>
        </div>
      </div>
    </div>
  )
}