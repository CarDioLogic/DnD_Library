import './App.css'
import { useState } from 'react';
import BookView from './views/BookView.tsx';
import {AllBooks} from './components/books/AllBooks.tsx';

import MainPageIcons from './components/general/MainPageIcons/MainPageIcons.tsx'

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