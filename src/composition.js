import logo from './images/blackLogo.png'
import MusicStar from './musicStar'

let url = process.env.REACT_APP_AIDENS_CLOUDINARY + 'COMPOSITION/'

if(process.env.NODE_ENV === 'development') {
  url = process.env.REACT_APP_MY_CLOUDINARY + 'composition/'
}

export default function Composition(props) {

  let songs = []
  let songLimit = 13

  for(let i = 1; i <= songLimit; i++) {
    let index = props.songs.length - i
    if(index >= 0) songs.unshift(props.songs[index])
  }

  return(
    <div className='starPage composition' >
      <div className='starBackground' >
        <div className='parallaxBackground' >
          <div className='musicStars' >
            {songs.map((song, index) => {
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
            <img className='logo' src={logo} alt='logo' ></img>
          </div>
        </div>
      </div>
    </div>
  )
}