export default function AvatarCard({ title, subtitle, imageSrc, classes, onClick, isSelected }) {
  return (
    <div className={`cursor-pointer flex flex-col items-center gap-2 text-center ${classes}`} onClick={onClick}>
      <div className={`h-20 w-20 rounded-full overflow-hidden ${isSelected ? 'border-2 border-blue-500' : ''}`}>
        <img src={imageSrc} alt={title} className="object-cover w-full h-full" />
      </div>

      <div>
        <div className={`${isSelected ? 'font-bold' : 'font-normal'}`}>{title}</div>
        {subtitle && <div className="page-text-sm text-gray-500">{subtitle}</div>}
      </div>
    </div>
  );
}
