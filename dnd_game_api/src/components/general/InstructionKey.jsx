import { useEffect, useState } from "react";
import { arrowMap } from "../../../Core/arrowMap";

export default function InstructionKey({
  keyBind,
  label,
  classNames,
  title,
  isArrow = false,
  onClickFunc
}) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === keyBind) {
        setIsPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === keyBind) {
        setIsPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyBind]);

  const triggerPress = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
  };

  const handleClick = () => {
    triggerPress();
    onClickFunc?.();
  };

  const displayKey = isArrow ? arrowMap[keyBind] : keyBind;

  return (
    <div
      onClick={handleClick}
      title={title ?? displayKey}
      className={`cursor-pointer instruction-key-container font-bold flex gap-1 flex-col justify-center items-center ${classNames}`}
    >
      <div
        className={`instruction-key px-3 py-1 rounded-md border transition-all duration-100
        ${
          isPressed
            ? "bg-gray-700 text-white scale-95 shadow-inner"
            : "bg-gray-200 text-black shadow"
        }`}
      >
        {displayKey}
      </div>

      <p className="break-words">{label}</p>
    </div>
  );
}