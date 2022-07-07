import logo from './images/blackLogo.png'
import MusicStar from './musicStar'

const url = 'https://res.cloudinary.com/dzgsesdip/video/upload/v1656525394/composition/'

// const url = 'https://res.cloudinary.com/djsqhh5qc/video/upload/v1656800397/COMPOSITION/'

export default function Composition(props) {

  return(
    <div className='composition' >
      <div className='blackStarBackground' >
        <div className='parallaxBackground' >
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
            <img className='logo' src={logo} alt='logo' ></img>
          </div>
        </div>
      </div>
    </div>
  )
}