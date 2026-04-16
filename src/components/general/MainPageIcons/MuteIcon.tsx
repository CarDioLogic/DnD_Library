import { useMemo, useState } from "react";
import SoundPlayer from "core/soundPlayer";
import Icon from 'src/components/general/Icon';

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