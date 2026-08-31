/* =========================================================
   ELARA VOSS — MAIN JS
   ========================================================= */


/* =========================================================
   LUCIDE ICONS
   ========================================================= */

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

if (cursor && ring && window.innerWidth > 768) {

  document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

  });

  function animateRing() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateRing);
  }

  animateRing();


  const interactiveElements = document.querySelectorAll(
    "a, button, input, .port-item, .service-card"
  );

  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

      cursor.style.transform =
        "translate(-50%, -50%) scale(2.5)";

      ring.style.transform =
        "translate(-50%, -50%) scale(1.5)";

      ring.style.opacity = "0.25";

    });

    element.addEventListener("mouseleave", () => {

      cursor.style.transform =
        "translate(-50%, -50%) scale(1)";

      ring.style.transform =
        "translate(-50%, -50%) scale(1)";

      ring.style.opacity = "0.55";

    });

  });

}


/* =========================================================
   STICKY NAVBAR
   ========================================================= */

const navbar = document.getElementById("navbar");

function updateNavbar() {

  if (!navbar) return;

  navbar.classList.toggle(
    "scrolled",
    window.scrollY > 50
  );
}

window.addEventListener(
  "scroll",
  updateNavbar,
  { passive: true }
);

updateNavbar();


/* =========================================================
   MOBILE MENU
   ========================================================= */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("close-menu");

function openMobileMenu() {

  if (!mobileMenu) return;

  mobileMenu.classList.add("open");

  document.body.style.overflow = "hidden";
}

function closeMobileMenu() {

  if (!mobileMenu) return;

  mobileMenu.classList.remove("open");

  document.body.style.overflow = "";
}

if (hamburger) {
  hamburger.addEventListener(
    "click",
    openMobileMenu
  );
}

if (closeMenu) {
  closeMenu.addEventListener(
    "click",
    closeMobileMenu
  );
}


/* Close menu after clicking a link */

document
  .querySelectorAll("#mobile-menu a")
  .forEach((link) => {

    link.addEventListener(
      "click",
      closeMobileMenu
    );

  });


/* Close with Escape */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeMobileMenu();
    }

  }
);


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


/* =========================================================
   CTA FORM
   ========================================================= */

const ctaForm =
  document.getElementById("cta-form");

const emailInput =
  document.getElementById("email-input");

const formMessage =
  document.getElementById("form-message");

if (ctaForm && emailInput && formMessage) {

  ctaForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      const email =
        emailInput.value.trim();

      if (!email) {

        formMessage.textContent =
          "Please enter your email.";

        emailInput.focus();

        return;
      }

      if (!emailInput.checkValidity()) {

        formMessage.textContent =
          "Please enter a valid email address.";

        emailInput.focus();

        return;
      }

      formMessage.textContent =
        "✓ Thank you! Your message has been received.";

      emailInput.value = "";

    }
  );

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backTop =
  document.getElementById("back-top");

if (backTop) {

  backTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


/* =========================================================
   PORTFOLIO ITEM CLICK
   ========================================================= */

document
  .querySelectorAll(".port-item")
  .forEach((item) => {

    item.addEventListener(
      "click",
      () => {

        const target =
          document.getElementById("cta");

        if (target) {

          target.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  });


/* =========================================================
   PREVENT EMPTY LINKS
   ========================================================= */

document
  .querySelectorAll('a[href="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
      }
    );

  });


/* =========================================================
   IMAGE FALLBACK
   ========================================================= */

document
  .querySelectorAll("img")
  .forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.style.background =
          "linear-gradient(135deg, #1a1a1a, #0d0d0d)";

        image.style.objectFit = "contain";

        image.alt = "Image unavailable";

      }
    );

  });