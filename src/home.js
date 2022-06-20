import star from './images/WEB_STAR_WHITE.png'

export default function Home() {


  return (<div className='home' >
    <div className='whoAmI' >
      {`//WHO AM I?`}
    </div>
    <div className='landingStar' >
      <img src={star} alt='star'></img>
    </div>
  </div>)
}