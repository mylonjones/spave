export default function Navigation() {

  function handleClick(e) {
    console.log(e.target.innerHTML)

    const pages = document.getElementsByClassName('pages')[0]

    let position = '-100vw'

    document.getElementsByClassName('showStars')[0] && document.getElementsByClassName('showStars')[0].classList.remove('showStars')

    switch(e.target.innerHTML) {
      case 'PRODUCTION':
        position = '0'
        document.getElementsByClassName('whiteStarBackground')[0].classList.add('showStars')
        break
      case 'APOLLOS':
        console.log('testing')
        position = '-100vw'
        break
      case 'COMPOSITION':
        position = '-200vw'
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
      <div className='shadow' >PRODUCTION</div>
      <div className='text' >PRODUCTION</div>
    </div>
    <div
      className='bigNav'
      onClick={handleClick}
      >
      <div className='shadow' >APOLLOS</div>
      <div className='text' >APOLLOS</div>
    </div>
    <div
      className='smallNav'
      onClick={handleClick}
      >
      <div className='shadow' >COMPOSITION</div>
      <div className='text' >COMPOSITION</div>
    </div>
  </div>)
}



