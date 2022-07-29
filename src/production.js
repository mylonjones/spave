import logo from './images/whiteLogo.png'
import MusicStar from './musicStar'

let url = process.env.REACT_APP_AIDENS_CLOUDINARY + 'PRODUCTION/'

if(process.env.NODE_ENV === 'development') {
  url = process.env.REACT_APP_MY_CLOUDINARY + 'production/'
}

export default function Production(props) {

  let songs = []
  let songLimit = 9

  for(let i = 1; i <= songLimit; i++) {
    let index = props.songs.length - i
    if(index >= 0) songs.unshift(props.songs[index])
  }


  return(
    <div className='starPage production' >
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
              number={'White' + index}
              color='white'
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