import '../../css/loadingBall.css';

export default function Loading({}) {
  return (
    <div className="flex flex-col gap-1 gap-5 justify-center items-center w-full h-full">
        <div className="ball-wrapper">
          <span className="ball"></span>
          <span className="ball-shadow"></span>
        </div>
        <span className="font-bold">Loading</span>
    </div>    
  )
}
