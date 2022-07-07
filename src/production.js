import logo from './images/whiteLogo.png'
import MusicStar from './musicStar'

const url = 'https://res.cloudinary.com/dzgsesdip/video/upload/v1656525394/production/'

// const url = 'https://res.cloudinary.com/djsqhh5qc/video/upload/v1656800397/PRODUCTION/'

export default function Production(props) {



  return(
    <div className='production' >
      <div className='whiteStarBackground' >
        <div className='parallaxBackground' >
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
            <img className='logo' src={logo} alt='logo' ></img>
          </div>
        </div>
      </div>
    </div>
  )
}