let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll && currentScroll > 50) {
    // Scroll hacia abajo -> ocultar navbar
    navbar.classList.add('navbar-hidden');
  } else {
    // Scroll hacia arriba -> mostrar navbar
    navbar.classList.remove('navbar-hidden');
  }

  lastScroll = currentScroll;
});

// Carrusel 3D controlado por scroll horizontal
gsap.registerPlugin(ScrollTrigger);

const ring = document.getElementById("ring");
const imgs = document.querySelectorAll(".img");
const captionEl = document.getElementById("carousel-caption");
const rotationStep = 360 / imgs.length;

const captions = [
  { title: "mi breve juventud", url: "https://www.youtube.com/watch?v=pdoszWsc5tU" },
  { title: "EN EL CIELO", url: "https://www.youtube.com/watch?v=YPVjWFhxTgo" },
  { title: "tiempo pasa", url: "https://www.youtube.com/watch?v=Ns5QkQGyRrc" },
  { title: "com você", url: "https://www.youtube.com/watch?v=Idar_BFzHGo" },
  { title: "TÚ ET MOI", url: "https://www.youtube.com/watch?v=SuGOPtPsyvc" },
  { title: "INRI", url: "https://www.youtube.com/watch?v=7gF7CHXBYCs" },
  { title: "mangata", url: "https://www.youtube.com/watch?v=K73UE9o-r-s" },
  { title: "CANIJO", url: "https://www.youtube.com/watch?v=SSYhUGsS_9s&list=RDSSYhUGsS_9s&start_radio=1" }
];

// Posición inicial
gsap.set(ring, { rotationY: 180 });
gsap.set(imgs, {
  rotateY: (i) => i * -rotationStep,
  transformOrigin: "50% 50% 600px",
  z: -500
});

// Animación de entrada
gsap.from(imgs, {
  y: 200,
  opacity: 0,
  stagger: 0.1,
  duration: 1.2,
  ease: "expo.out"
});

// Función para actualizar caption
function updateCaptions(rotationY) {
  const normalizedRotation = (rotationY + 360) % 360;
  let index = Math.round(normalizedRotation / rotationStep) % imgs.length;
  index = (imgs.length - index) % imgs.length;
  captionEl.innerHTML = `<a href="${captions[index].url}" target="_blank" class="carousel-caption-link">${captions[index].title}</a>`;
}

// Scroll horizontal con mouse wheel
let rotationY = 180;
window.addEventListener("wheel", (e) => {
  e.preventDefault();
  rotationY -= e.deltaY * 0.2; // ajusta velocidad
  gsap.to(ring, {
    rotationY: rotationY,
    duration: 0.3,
    ease: "power1.out",
    onUpdate: () => updateCaptions(rotationY)
  });
}, { passive: false });

// Inicializar caption
updateCaptions(rotationY);

// cursor personalizado
const cursor = document.querySelector(".custom-cursor-oficial");

document.addEventListener("mousemove", e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

const links = document.querySelectorAll("a, button");

links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    cursor.style.width = "35px";
    cursor.style.height = "35px";
    cursor.style.backgroundColor = "rgba(255,0,0,0.6)"; // rojo semitransparente
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.backgroundColor = "rgba(255, 255, 255, 1)";
  });
});




