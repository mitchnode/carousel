export function carousel(images) {
  let scrollPos = 0;
  const carouselDOM = document.getElementById("carousel");
  carouselDOM.style.position = "relative";
  carouselDOM.style.width = "800px";
  carouselDOM.style.height = "500px";

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
  let left = document.createElement("div");
  left.style.height = "100%";
  left = styleDiv(left);
  left = addHover(left, setHoverBlack, setReturnClear);
  left.style.left = "0";
  left.style.top = "0";
  left.textContent = "<";

  let right = document.createElement("div");
  right.style.height = "100%";
  right = styleDiv(right);
  right = addHover(right, setHoverBlack, setReturnClear);
  right.style.right = "0";
  right.style.top = "0";
  right.textContent = ">";

  left.addEventListener("click", () => {
    scrollPos = nextPrev(scrollPos, container, -1);
  });
  right.addEventListener("click", () => {
    scrollPos = nextPrev(scrollPos, container, 1);
  });

  let nav = document.createElement("div");
  nav = styleDiv(nav);
  nav.style.width = "20%";
  nav.style.height = "10%";
  nav.style.textAlign = "center";
  nav.style.alignItems = "center";
  nav.style.justifyContent = "space-between";
  nav.style.left = "40%";
  nav.style.bottom = "0";
  nav.style.display = "flex";
  nav.style.gap = "10px";

  for (let n = 0; n < images.length; n++) {
    let circle = document.createElement("div");
    circle.id = n;
    circle.className = "circle";
    if (n == 0) {
      circle.style.backgroundColor = "#FFFFFF";
    }
    circle.style.border = "solid 1px white";
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.borderRadius = "50%";
    circle.style.textAlign = "center";

    circle.addEventListener("click", (e) => {
      setCircles(e.target);
      scrollPos = n * 800;
      container.scroll(scrollPos, 0);
    });

    if (circle.style.backgroundColor == "rgb(255, 255, 255)") {
      circle = addHover(circle, setHoverWhite, setReturnWhite);
    } else {
      circle = addHover(circle, setHoverWhite, setReturnClear);
    }
    nav.appendChild(circle);
  }

  carouselDOM.appendChild(left);
  carouselDOM.appendChild(right);
  carouselDOM.appendChild(nav);

  setInterval(() => {
    scrollPos = nextPrev(scrollPos, container, 1);
  }, 5000);
}

const setHoverBlack = (e) => {
  e.target.style.backgroundColor = "rgba(0,0,0,0.5)";
};

const setHoverWhite = (e) => {
  e.target.style.backgroundColor = "rgba(255,255,255,0.5)";
};

const setReturnClear = (e) => {
  e.target.style.backgroundColor = "rgba(0,0,0,0)";
};

const setReturnWhite = (e) => {
  e.target.style.backgroundColor = "rgb(255,255,255)";
};

function nextPrev(scrollPos, container, n) {
  if (scrollPos == 0 && n == -1) {
    container.scroll((scrollPos += 3200), 0);
  } else if (scrollPos >= 0 && scrollPos < 3200) {
    container.scroll((scrollPos += n * 800), 0);
  } else if (scrollPos == 3200) {
    container.scroll((scrollPos -= 3200), 0);
  }

  let selectedCircle = document.getElementById(
    `${Math.floor(scrollPos / 800)}`
  );
  setCircles(selectedCircle);

  return scrollPos;
}

function styleDiv(div) {
  div.style.position = "absolute";
  div.style.zIndex = "10";
  div.style.alignContent = "center";
  div.style.color = "#FFFFFF";
  div.style.fontSize = "1.5em";
  div.style.fontWeight = "800";
  div.style.padding = "0px 10px 0px 10px";
  div.style.cursor = "pointer";
  return div;
}

function addHover(div, setHoverColor, setReturnColor) {
  div.addEventListener("mouseover", setHoverColor);
  div.addEventListener("mouseout", setReturnColor);
  return div;
}

function setCircles(selectedCircle) {
  const circles = document.getElementsByClassName("circle");
  for (let c = 0; c < circles.length; c++) {
    circles[c].style.backgroundColor = "rgba(0,0,0,0.0)";
    circles[c].removeEventListener("mouseout", setReturnWhite);
    circles[c].addEventListener("mouseout", setReturnClear);
  }
  selectedCircle.style.backgroundColor = "#FFFFFF";
  selectedCircle.addEventListener("mouseout", setReturnWhite);
}
