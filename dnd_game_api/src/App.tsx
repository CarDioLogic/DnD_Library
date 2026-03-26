import './App.css'
// import Monsters from './views/Monsters.jsx';
import MonstersBookView from './views/MonstersBookView.jsx';
import SpellsBookView from './views/SpellsBookView.jsx';

import MuteIcon from './components/general/MuteIcon'

function App() {
  return (
    <>
        {
          // <Monsters />
          // <MonstersBookView/>
          <SpellsBookView/>
        }        
      <MuteIcon/>
   </>
  )
}

export default App
