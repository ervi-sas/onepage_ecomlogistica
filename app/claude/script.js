(function () {
    "use strict";

    var prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ---------------------------------------------------------
       1. Menú móvil
    --------------------------------------------------------- */
    var navToggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            var isOpen = navLinks.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ---------------------------------------------------------
       2. Reveal al hacer scroll
    --------------------------------------------------------- */
    var revealEls = document.querySelectorAll(".ev-reveal");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealEls.forEach(function (el) {
            el.classList.add("is-visible");
        });
    } else {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ---------------------------------------------------------
       3. Acordeón de preguntas frecuentes
    --------------------------------------------------------- */
    var faqButtons = document.querySelectorAll(".ev-faq__q");

    faqButtons.forEach(function (btn) {
        var answer = btn.nextElementSibling;

        btn.addEventListener("click", function () {
            var isOpen = btn.getAttribute("aria-expanded") === "true";

            // Cierra las demás respuestas abiertas
            faqButtons.forEach(function (otherBtn) {
                if (otherBtn !== btn) {
                    otherBtn.setAttribute("aria-expanded", "false");
                    otherBtn.nextElementSibling.style.maxHeight = null;
                }
            });

            if (isOpen) {
                btn.setAttribute("aria-expanded", "false");
                answer.style.maxHeight = null;
            } else {
                btn.setAttribute("aria-expanded", "true");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* ---------------------------------------------------------
       4. Formulario de contacto
       No hay backend conectado: valida en el cliente y confirma
       visualmente el envío. Cuando exista un endpoint real,
       reemplazar el bloque marcado abajo por un fetch() al API.
    --------------------------------------------------------- */
    var form = document.getElementById("contactForm");
    var statusEl = document.getElementById("formStatus");

    if (form && statusEl) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var required = form.querySelectorAll("[required]");
            var allFilled = true;

            required.forEach(function (field) {
                if (!field.value.trim()) {
                    allFilled = false;
                    field.style.outline = "2px solid #ff6b6b";
                } else {
                    field.style.outline = "";
                }
            });

            if (!allFilled) {
                statusEl.textContent =
                    "Por favor completa los campos obligatorios (nombre, empresa, correo).";
                statusEl.style.color = "#ff9d9d";
                return;
            }

            var emailField = form.querySelector("#f-correo");
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField && !emailPattern.test(emailField.value.trim())) {
                statusEl.textContent = "Revisa el correo, no parece válido.";
                statusEl.style.color = "#ff9d9d";
                emailField.style.outline = "2px solid #ff6b6b";
                return;
            }

            // ---- Punto de integración futura con el backend real ----
            // fetch('/api/contacto', { method: 'POST', body: new FormData(form) })

            var submitBtn = form.querySelector("button[type='submit']");
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Enviando...";
            }

            window.setTimeout(function () {
                statusEl.style.color = "#7cf0ff";
                statusEl.textContent =
                    "Recibimos tu solicitud. Te contactaremos en las próximas horas.";
                form.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = "Solicitar cotización";
                }
            }, 600);
        });
    }

    /* ---------------------------------------------------------
       5. Estado del nav al hacer scroll (sombra sutil)
    --------------------------------------------------------- */
    var navHeader = document.getElementById("navHeader");
    if (navHeader) {
        var lastState = false;
        window.addEventListener(
            "scroll",
            function () {
                var scrolled = window.scrollY > 8;
                if (scrolled !== lastState) {
                    navHeader.style.boxShadow = scrolled
                        ? "0 8px 30px rgba(0,0,0,0.25)"
                        : "none";
                    lastState = scrolled;
                }
            },
            { passive: true }
        );
    }
})();