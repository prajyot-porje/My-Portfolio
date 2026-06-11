// Updates --mouse-x and --mouse-y on hovered depth cards
// Call initMouseTracker() once in layout
export function initMouseTracker() {
  document.querySelectorAll(".depth-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = (card as HTMLElement).getBoundingClientRect();
      const x = (((e as MouseEvent).clientX - rect.left) / rect.width) * 100;
      const y = (((e as MouseEvent).clientY - rect.top) / rect.height) * 100;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}%`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}%`);
    });
  });
}
