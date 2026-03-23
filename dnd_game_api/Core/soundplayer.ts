export const playPageFlip = (fileName: string) => {
  const audio = new Audio(`/sounds/${fileName}`);
  audio.play().catch((err) => {
    console.error("Error playing sound:", err);
  });
};