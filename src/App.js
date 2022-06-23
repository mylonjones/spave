import Home from './home'
import Navigation from './navigation'
import Production from './production'

function App() {
  return (
    <div className="app">
      <Navigation />
      <div className='pages'>
        <Production />
        <Home/>
        <div className='composition' ></div>
      </div>
    </div>
  );
}

export default App;
