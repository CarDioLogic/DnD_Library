import './App.css'
import { useState } from 'react';
import BookView from './views/BookView.jsx';
import {AllBooks} from './views/AllBooks.jsx';

import MainPageIcons from './components/general/MainPageIcons/MainPageIcons.jsx'

function App() {
  const [currentBook, setCurrentBook] = useState(Object.keys(AllBooks)[0]);

  return (
    <>
      <BookView currentBook={currentBook} />
      <MainPageIcons setCurrentBook={setCurrentBook} />
    </>
  )
}

export default App