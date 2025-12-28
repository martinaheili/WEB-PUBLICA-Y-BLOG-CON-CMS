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

// Seleccionamos el cursor
const cursor = document.querySelector(".custom-cursor-oficial");

// Variables para mouse
let mouse = { x: 0, y: 0 };
let pos = { x: 0, y: 0 };

// Detectamos movimiento del mouse
document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Animación del cursor
function animateCursor() {
  // Suavizado con GSAP
  gsap.to(pos, {
    x: mouse.x,
    y: mouse.y,
    duration: 0.12,
    ease: "power1.out",
    onUpdate: () => {
      // Si usas ScrollSmoother / Locomotive Scroll, sumar scroll offset aquí
      // const scrollTop = document.querySelector("[data-scroll-container]")?.scrollTop || 0;
      cursor.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    }
  });

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover sobre links y botones
const links = document.querySelectorAll("a, button");
links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    gsap.to(cursor, { width: 35, height: 35, backgroundColor: "rgba(255,0,0,0.6)", duration: 0.2 });
  });
  link.addEventListener("mouseleave", () => {
    gsap.to(cursor, { width: 20, height: 20, backgroundColor: "rgba(255,255,255,1)", duration: 0.2 });
  });
});