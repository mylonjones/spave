import Home from './home'
import Navigation from './navigation'

function App() {
  return (
    <div className="app">
      <Navigation />
      <div className='pages'>
        {/* <div className='production' ></div> */}
        <Home/>
        {/* <div className='composition' ></div> */}
      </div>
    </div>
  );
}

export default App;
