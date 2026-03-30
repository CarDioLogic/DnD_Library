import { useMemo, useState } from "react";
import SoundPlayer from "../../../../Core/soundPlayer";
import Icon from '../Icon';

export default function MuteIcon() {
  const soundPlayer = useMemo(() => new SoundPlayer(), []);
  const [isMuted, setIsMuted] = useState(() => soundPlayer.getIsMuted());

  const toggleMute = () => {
    setIsMuted(soundPlayer.toggleMuted());
  };

  return (
    <>
      <div className="main-page-icon" onClick={toggleMute}>
        <Icon
          title="Sound"
          imgSrc={`/images/general/${isMuted ? "muted" : "notMuted"}.svg`}
          altText="sound icon"
        />  
      </div>
    </>  
  );
}