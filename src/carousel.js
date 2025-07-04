export function carousel(images) {
  const carouselDOM = document.getElementById("carousel");
  const container = document.createElement("div");
  container.style.width = "500%";
  container.style.display = "flex";
  container.style.flexDirection = "rows";

  for (let image in images) {
    const imageDOM = document.createElement("div");
    imageDOM.style.backgroundImage = `url(${images[image]})`;
    imageDOM.style.backgroundColor = "blue";
    container.appendChild(imageDOM);
  }
  carouselDOM.appendChild(container);
}
