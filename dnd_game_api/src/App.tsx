import './App.css'
// import Monsters from './views/Monsters.jsx';
import BestiaryBook from './components/monster/books/BestiaryBook.jsx';

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-400">
        <h1 className="text-3xl font-bold underlin mb-10">
          Dnd Game API
        </h1>
        {
          // <Monsters />
          <BestiaryBook />
        }        
      </div>
    </>
  )
}

export default App
