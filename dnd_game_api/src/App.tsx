import './App.css'
// import Monsters from './views/Monsters.jsx';
import MonstersBookView from './views/MonstersBookView.jsx';
import MuteIcon from './components/general/MuteIcon'

function App() {
  return (
    <>
        {
          // <Monsters />
          <MonstersBookView/>
        }        
      <MuteIcon/>
   </>
  )
}

export default App
