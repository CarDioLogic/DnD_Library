import HTMLFlipBook from 'react-pageflip';
// import BookPage from './BookPage';

export default function BookFrame({children}) {
    return (
        <HTMLFlipBook width={300} height={500}>
            {/* pass the pages */}
            {children}
        </HTMLFlipBook>
    );
}