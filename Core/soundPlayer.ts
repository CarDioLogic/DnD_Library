import { getRandomInRange, setIsMuted, getIsMuted } from "./helpers";

export default class SoundPlayer {
  toggleMuted = (): boolean => {
    const nextMuted = !getIsMuted();
    setIsMuted(nextMuted);
    return nextMuted;
  };

  getIsMuted = (): boolean => {
    return getIsMuted();
  };

  playFile(fileName: string) {
    const isMuted = getIsMuted();

    if (isMuted) return;

    const audio = new Audio(`/sounds/${fileName}`);
    audio.play().catch(console.error);
  }

  playRandomPageFlipSound() {
    const randomIndex = getRandomInRange(1, 2);
    this.playFile(`misc/page-flip-${randomIndex}.mp3`);
  }

  playPageFlip1() {
    this.playFile("misc/page-flip-1.mp3");
  }

  playPageFlip2() {
    this.playFile("misc/page-flip-2.mp3");
  }
}