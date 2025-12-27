/* ------------ PÁGINA CONCIERTOS ------------ */
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


$(function () {
  const $hover = $('.hover-image');
  const $img = $hover.find('img');

  $('.conciertos-section tbody tr').on('mouseenter', function () {
    const src = $(this).data('image');
    if (!src) return;

    const x = Math.random() * 250 + 80;
    const y = Math.random() * 180 + 60;

    $img.attr('src', src);
    $hover.css({
      transform: `translate(${x}px, ${y}px)`
    });

    $hover.stop(true).fadeTo(200, 1);
  });

  $('.conciertos-section tbody tr').on('mouseleave', function () {
    $hover.stop(true).fadeTo(200, 0);
  });
});

gsap.registerPlugin(ScrollTrigger);

// TEXTO BODHIRIA CON BLUR DINÁMICO
gsap.fromTo(
  ".tour-title",
  { scaleY: 1, filter: "blur(0px)", opacity: 1 },
  {
    scaleY: 5,
    filter: "blur(5px)",
    opacity: 0.5,  // se vuelve más gris y transparente
    ease: "none",
    scrollTrigger: {
      trigger: ".tour-section",
      start: "top bottom",
      end: "top top",
      scrub: true
    }
  }
);



gsap.registerPlugin(ScrollTrigger, Draggable);
gsap.fromTo(
  ".tour-title",
  { scaleY: 1 },
  {
    scaleY: 5,
    ease: "none",
    scrollTrigger: {
      trigger: ".tour-section",
      start: "top bottom",
      end: "top top",
      scrub: true
    }
  }
);

/* ----------------------------
   IMÁGENES
---------------------------- */
const images = gsap.utils.toArray(".tour-img");

// GRID INVISIBLE PARA EVITAR SOLAPES
const cols = 4;
const rows = 2;
const padding = 80;

const colWidth = window.innerWidth / cols;
const rowHeight = window.innerHeight / rows;

images.forEach((img, i) => {
  const col = i % cols;
  const row = Math.floor(i / cols);

  gsap.set(img, {
    x: col * colWidth + gsap.utils.random(padding, colWidth - 260),
    y: row * rowHeight + gsap.utils.random(padding, rowHeight - 260),
    rotation: gsap.utils.random(-12, 12),
    opacity: 0,
    scale: 0.9
  });
});

/* APARECEN Y DESAPARECEN CON SCROLL */
gsap.fromTo(
  images,
  { opacity: 0, scale: 0.9 },
  {
    opacity: 1,
    scale: 1,
    stagger: 0.12,
    ease: "none",
    scrollTrigger: {
      trigger: ".tour-section",
      start: "top center",
      end: "top top",
      scrub: true
    }
  }
);

/* ----------------------------
   DRAGGABLE
---------------------------- */
Draggable.create(images, {
  bounds: ".tour-section",
  inertia: true,
  onPress() {
    this.target.style.zIndex = 20;
  },
  onRelease() {
    this.target.style.zIndex = "";
  }
});



const tourSection = document.querySelector(".tour-section");
const numberOfLines = 8;

for (let i = 0; i < numberOfLines; i++) {
  const line = document.createElement("div");
  line.classList.add("tour-line");

  const isHorizontal = Math.random() > 0.5;
  if (isHorizontal) {
    line.classList.add("horizontal");
    line.style.top = `${gsap.utils.random(0, tourSection.offsetHeight)}px`;
    line.style.left = `0`;
  } else {
    line.classList.add("vertical");
    line.style.left = `${gsap.utils.random(0, tourSection.offsetWidth)}px`;
    line.style.top = `0`;
  }

  tourSection.appendChild(line);

  // Animación “dibujando” y “desdibujando” con scroll
  gsap.fromTo(
    line,
    { scaleX: isHorizontal ? 0 : 1, scaleY: !isHorizontal ? 0 : 1 },
    {
      scaleX: isHorizontal ? 1 : undefined,
      scaleY: !isHorizontal ? 1 : undefined,
      ease: "none",
      scrollTrigger: {
        trigger: ".tour-section",
        start: "top bottom",
        end: "top top",
        scrub: true
      }
    }
  );
}

