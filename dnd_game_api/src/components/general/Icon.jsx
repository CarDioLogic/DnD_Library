export default function Icon({imgSrc, altText, label, orientation = "horizontal", className, parentClasses, title}) {
  return (
    <div title={title ?? ""}
      className={`flex gap-1 ${orientation === "vertical" ? "flex-col" : "flex-row"} ${parentClasses}`}>
      <img 
          src={imgSrc}
          alt={altText}
          className={`h-6 w-6 ${className}`}
      />
      <p className="break-words">{label}</p>
    </div>
  )
}
