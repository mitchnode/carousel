export function carousel(images) {
  let scrollPos = 0;
  const carouselDOM = document.getElementById("carousel");
  const container = document.createElement("div");
  container.style.overflowX = "hidden";
  container.style.width = "800px";
  container.style.height = "500px";
  container.style.display = "flex";

  for (let image in images) {
    const imageDOM = document.createElement("div");
    imageDOM.style.background = `url(${images[image]}) no-repeat center`;
    imageDOM.style.flex = "0 0 100%";

    container.appendChild(imageDOM);
  }
  carouselDOM.appendChild(container);
  const left = document.createElement("button");
  left.textContent = "<";
  const right = document.createElement("button");
  right.textContent = ">";

  left.addEventListener("click", () => {
    scrollPos = nextPrev(scrollPos, container, -1);
  });
  right.addEventListener("click", () => {
    scrollPos = nextPrev(scrollPos, container, 1);
  });

  carouselDOM.appendChild(left);
  carouselDOM.appendChild(right);
}

function nextPrev(scrollPos, container, n) {
  console.log(`ScrollPos: ${scrollPos}`);
  console.log(`Moving slide to ${scrollPos + n * 800}`);
  if (scrollPos == 0 && n == -1) {
    container.scroll((scrollPos += 3200), 0);
  } else if (scrollPos >= 0 && scrollPos < 3200) {
    container.scroll((scrollPos += n * 800), 0);
  } else if (scrollPos == 3200) {
    container.scroll((scrollPos -= 3200), 0);
  }
  return scrollPos;
}
