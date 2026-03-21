import './App.css'
import Monsters from './views/Monsters.jsx';

function App() {


  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-400">
        <h1 className="text-3xl font-bold underline">
          Dnd Game API
        </h1>
        {
          <Monsters />
        }        
      </div>
    </>
  )
}

export default App
