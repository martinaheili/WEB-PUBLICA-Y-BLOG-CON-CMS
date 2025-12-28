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


// ----------------------------
// HOVER IMÁGENES EN TABLA
// ----------------------------
$(function () {
  const $hover = $('.hover-image');
  const $img = $hover.find('img');

  $('.merch-table-wrapper tbody tr').on('mouseenter', function () {
    const src = $(this).data('image');
    if (!src) return;

    const x = Math.random() * 950 + 80; // posición random
    const y = Math.random() * 180 + 60;

    $img.attr('src', src);
    $hover.css({
      transform: `translate(${x}px, ${y}px)`,
      display: 'block'
    }).stop(true).fadeTo(200, 1);
  });

  $('.merch-table-wrapper tbody tr').on('mouseleave', function () {
    $hover.stop(true).fadeTo(200, 0, function() {
      $(this).css('display','none');
    });
  });
});



gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const dropTitle = document.querySelector(".drop-title");
  if (!dropTitle) return;

  gsap.to(dropTitle, {
    filter: "blur(25px)", // borroso
    opacity: 0.3,          // menos visible
    ease: "none",
    scrollTrigger: {
      trigger: dropTitle,
      start: "top top",    // cuando empieza a hacer scroll
      end: "+=200",        // scroll en px que dura la transición
      scrub: true
    }
  });
});


// CARRITO

const cart = [];

function updateCart() {
  const cartList = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  cartList.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    li.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="${item.image}" alt="${item.name}" style="width:300px; height:auto;">
        <span>${item.name}</span>
      </div>
      <div class="cart-quantity d-flex align-items-center gap-1">
        <button class="btn btn-sm btn-outline-secondary" data-index="${index}" data-action="minus">-</button>
        <span>${item.qty}</span>
        <button class="btn btn-sm btn-outline-secondary" data-index="${index}" data-action="plus">+</button>
        <span>€${item.price * item.qty}</span>
      </div>
    `;
    cartList.appendChild(li);
  });

  cartTotal.textContent = `€${total}`;
}

// Eventos para aumentar/disminuir cantidad
document.getElementById('cartItems').addEventListener('click', (e) => {
  if (e.target.dataset.action) {
    const index = e.target.dataset.index;
    if (e.target.dataset.action === 'plus') cart[index].qty++;
    if (e.target.dataset.action === 'minus' && cart[index].qty > 1) cart[index].qty--;
    updateCart();
  }
});

// Botones "Agregar al carrito"
document.querySelectorAll('.add-to-cart').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const name = card.querySelector('.product-name').textContent;
    const price = parseFloat(card.querySelector('.product-price').textContent.replace('€',''));
    const image = card.querySelector('.product-image').src;

    // Ver si ya existe en carrito
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({name, price, qty: 1, image});
    }

    // Abrir offcanvas
    const offcanvasEl = document.getElementById('cartOffcanvas');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);
    bsOffcanvas.show();

    updateCart();
  });
});


// OVERLAY ROJO

gsap.registerPlugin(ScrollTrigger);

gsap.to(".newsletter-red-overlay", {
  opacity: 1, // intensidad de la “tinta” roja
  scrollTrigger: {
    trigger: ".newsletter-section",
    start: "top bottom",   // cuando empieza a aparecer desde la parte inferior del viewport
    end: "top top",        // hasta que top de sección llega a top viewport
    scrub: true,           // suaviza la transición
  }
});