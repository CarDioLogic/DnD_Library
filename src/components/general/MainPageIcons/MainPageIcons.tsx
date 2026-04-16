import BookshelfIcon from "./BookshelfIcon";
import MuteIcon from "./MuteIcon";

export default function MainPageIcons({setCurrentBook}) {
  return (
    <div className="flex flex-col gap-2 absolute top-[10px] right-[40px]">
        <MuteIcon/>
        <BookshelfIcon
            setCurrentBook={setCurrentBook}/>
    </div>
  );
}