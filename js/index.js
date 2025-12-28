gsap.registerPlugin(ScrollTrigger);

// -------------------- HERO SECTION --------------------
// Hero Video + Logo Niñadelsur
const heroLogo = document.querySelector(".hero-logo");
const heroBg = document.querySelector(".hero-bg");

gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top",
    end: "bottom+=100% top",
    scrub: true,
    pin: true
  }
})
  // Zoom del logo para “meternos dentro”
  .to(heroLogo, {
    scale: 50,
    xPercent: -50,
    yPercent: -50,
    ease: "power2.out"
  })
  // Revelamos el fondo mientras el logo crece
  .to(heroBg, {
    opacity: 1,
    ease: "power1.inOut"
  }, 0)
  // Después del zoom, mostramos los logos Judeline
  .to(".judeline-container", {
    opacity: 1,
    ease: "power1.inOut"
  }, 0.2);

// Animación de duplicación hacia abajo
const judelineContainer = document.querySelector(".judeline-container");
gsap.to({}, { 
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top top+=100",
    end: "bottom+=200%",
    scrub: true,
    onUpdate: self => {
      const count = Math.min(4, Math.floor(self.progress * 7));
      judelineContainer.innerHTML = "";
      for(let i=0; i<count; i++){
        const logo = document.createElement("h1");
        logo.classList.add("judeline-logo");
        logo.textContent = "JUDELINE";
        judelineContainer.appendChild(logo);
      }
    }
  }
});



gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Inicializamos ScrollSmoother
ScrollSmoother.create({
  smooth: 1,        // velocidad de suavizado
  effects: true,    // habilita data-scroll-effect si quieres
  smoothTouch: 0.1
});

// Pin y sticky de la sección
ScrollTrigger.create({
  trigger: ".home1-section",
  start: "top top",
  end: "+=200%",
  pin: true,
  pinSpacing: false
});



gsap.fromTo(
  ".reveal-text",
  {
    yPercent: -50
  },
  {
    yPercent: -120, // sube el texto
    scrollTrigger: {
      trigger: ".home1-section",
      start: "center center", // justo cuando empieza la imagen sticky
      end: "bottom top",
      scrub: true
    }
  }
);

// Máscara: se abre desde la mitad de pantalla hacia abajo
gsap.fromTo(
  ".reveal-mask",
  {
    clipPath: "inset(0 0 100% 0)"
  },
  {
    clipPath: "inset(0 0 0% 0)",
    scrollTrigger: {
      trigger: ".home1-section",
      start: "center center",
      end: "bottom top",
      scrub: true
    }
  }
);





