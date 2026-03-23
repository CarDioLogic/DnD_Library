import { getRandomInRange } from "./helpers";

export const playFile = (fileName: string) => {
  const audio = new Audio(`/sounds/${fileName}`);
  audio.play().catch((err) => {
    console.error("Error playing sound:", err);
  });
};

export const playRandomPageFlipSound = () => {
  const randomIndex = getRandomInRange(1, 2);
  playFile(`misc/page-flip-${randomIndex}.mp3`);
};

export const playPageFlip1 = () => {
  playFile(`misc/page-flip-1.mp3`);
};

export const playPageFlip2 = () => {
  playFile(`misc/page-flip-2.mp3`);
};