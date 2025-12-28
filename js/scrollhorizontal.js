gsap.registerPlugin(ScrollTrigger);

// -------------------- PANEL PRINCIPAL --------------------
// Imagen centrada + fondo rojo
gsap.set(".home2-panel", { xPercent: 100 });

gsap.to(".home2-panel", {
  xPercent: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".home2-swipe",
    start: "top top",
    end: "+=100%",
    scrub: true,
    pin: true
  }
});

// -------------------- TEXTOS LATERALES --------------------
const leftText = document.querySelector(".home2-text.left");
const rightText = document.querySelector(".home2-text.right");

gsap.to(leftText, {
  x: "60%", // se mueve desde la izquierda hacia el centro
  opacity: 1,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".home2-swipe",
    start: "top top",
    end: "+=100%",
    scrub: true
  }
});

gsap.to(rightText, {
  x: "-60%", // se mueve desde la derecha hacia el centro
  opacity: 1,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".home2-swipe",
    start: "top top",
    end: "+=100%",
    scrub: true
  }
});

// -------------------- NAVBAR --------------------
const navbar = document.querySelector(".navbar");

// Inicializamos fuera de pantalla arriba
gsap.set(navbar, { y: "-100%", opacity: 0 });

gsap.to(navbar, {
  y: "0%",
  opacity: 1,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".home2-swipe",
    start: "top top",
    end: "+=100%",
    scrub: true
  }
});

const cursor = document.querySelector(".custom-cursor-oficial");

let mouse = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };
const speed = 0.15; // cuanto más bajo, más suave

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  // Suavizado tipo “lerp”
  pos.x += (mouse.x - pos.x) * speed;
  pos.y += (mouse.y - pos.y) * speed;

  cursor.style.transform = `translate(${pos.x}px, ${pos.y}px)`;

  requestAnimationFrame(animate);
}

animate();

// Hover sobre links
const links = document.querySelectorAll("a, button");

links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    cursor.style.width = "35px";
    cursor.style.height = "35px";
    cursor.style.backgroundColor = "rgba(255,0,0,0.6)";
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.backgroundColor = "rgba(255,255,255,1)";
  });
});




// Audio
const audio = document.getElementById('background-audio');
const toggleBtn = document.getElementById('audio-toggle');

// Inicializar estado
let isPlaying = !audio.paused; // true si el audio ya estaba sonando
toggleBtn.textContent = isPlaying ? "SOUND ON" : "SOUND OFF";

// Toggle al click
toggleBtn.addEventListener('click', () => {
  if (!isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }
  isPlaying = !isPlaying;
  toggleBtn.textContent = isPlaying ? "SOUND ON" : "SOUND OFF";
});