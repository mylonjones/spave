import Home from './home'
import Navigation from './navigation'
import Production from './production'
import Composition from './composition'

function App() {
  return (
    <div className="app">
      <Navigation />
      <div className='pages'>
        <Production />
        <Home/>
        <Composition />
      </div>
    </div>
  );
}

export default App;
