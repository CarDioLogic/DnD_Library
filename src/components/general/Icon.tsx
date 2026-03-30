export default function Icon({imgSrc, altText, label, orientation = "horizontal", className, parentClasses, title}) {
  return (
    <div title={title ?? ""}
      className={`flex gap-1 ${orientation === "vertical" ? "flex-col" : "flex-row"} ${parentClasses}`}>
      <img 
          src={`${import.meta.env.BASE_URL}${imgSrc}`}
          alt={altText}
          className={`page-icon ${className}`}
      />
      <p className="break-words page-text-sm">{label}</p>
    </div>
  )
}
