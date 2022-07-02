export default function Navigation() {

  function handleClick(e) {

    const pages = document.getElementsByClassName('pages')[0]

    const nav = document.getElementsByClassName('navbar')[0]

    let position = '-100vw'

    document.getElementsByClassName('showStars')[0] && document.getElementsByClassName('showStars')[0].classList.remove('showStars')
    document.getElementsByClassName('active')[0].classList.remove('active')

    switch(e.target.innerHTML) {
      case 'PRODUCTION':
        position = '0'
        document.getElementsByClassName('whiteStarBackground')[0].classList.add('showStars')
        document.getElementById('production').classList.add('active')
        nav.style.color = 'white'
        break
      case 'APOLLOS':
        position = '-100vw'
        nav.style.color = 'white'
        document.getElementById('apollos').classList.add('active')
        break
      case 'COMPOSITION':
        position = '-200vw'
        nav.style.color = 'black'
        document.getElementsByClassName('blackStarBackground')[0].classList.add('showStars')
        document.getElementById('composition').classList.add('active')
        break
      default:
        break
    }
    pages.style.transform = `translateX(${position})`
  }

  return(<div className='navbar' >
    <div
      className='smallNav'
      onClick={handleClick}
      >
      <div className='shadow' id='production' >PRODUCTION</div>
      <div className='text' >PRODUCTION</div>
    </div>
    <div
      className='bigNav'
      onClick={handleClick}
      >
      <div className='shadow active' id='apollos' >APOLLOS</div>
      <div className='text' >APOLLOS</div>
    </div>
    <div
      className='smallNav'
      onClick={handleClick}
      >
      <div className='shadow' id='composition' >COMPOSITION</div>
      <div className='text' >COMPOSITION</div>
    </div>
  </div>)
}



