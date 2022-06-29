import logo from './images/whiteLogo.png'
import MusicStar from './musicStar'

const url = 'https://res.cloudinary.com/dzgsesdip/video/upload/v1656525394/music/'


export default function Production(props) {

  return(
    <div className='production' >
      <div className='whiteStarBackground' >
        <div className='musicStars' >
        {props.songs.map((song, index) => {
            index = index + 1
            return (
              <MusicStar
            name={'//' + song.name}
            key={index}
            sound={url + song.file}
            number={'White' + index}
            color='white'
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