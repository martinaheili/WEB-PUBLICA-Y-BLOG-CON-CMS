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