export default function Navigation() {

  function handleClick(e) {

    const pages = document.getElementsByClassName('pages')[0]

    const nav = document.getElementsByClassName('navbar')[0]

    const shadow = document.getElementsByClassName('shadow')

    function shadowColor(color) {
      for(let i = 0; i < shadow.length; i++) {
        shadow[i].style.color = color
      }
    }

    let position = '-100vw'

    document.getElementsByClassName('showStars')[0] && document.getElementsByClassName('showStars')[0].classList.remove('showStars')
    document.getElementsByClassName('active')[0].classList.remove('active')


    switch(e.target.innerHTML) {
      case 'PRODUCTION':
        position = '0'
        document.getElementsByClassName('starBackground')[0].classList.add('showStars')
        document.getElementById('production').classList.add('active')
        nav.style.color = 'white'
        shadowColor('#dbdbdb')
        break
      case 'APOLLOS':
        position = '-100vw'
        nav.style.color = 'white'
        document.getElementById('apollos').classList.add('active')
        shadowColor('#dbdbdb')
        break
      case 'COMPOSITION':
        position = '-200vw'
        nav.style.color = 'black'
        document.getElementsByClassName('starBackground')[1].classList.add('showStars')
        document.getElementById('composition').classList.add('active')
        shadowColor('#373737')
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



