(() => {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Menú móvil
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  // Fallback de reveal; GSAP toma el control cuando está disponible.
  const reveal = document.querySelectorAll(".reveal");
  if (!reduce && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".hero__glow--a", {scale:.7, x:-80}, {scale:1.25, x:50, duration:5, ease:"sine.inOut", repeat:-1, yoyo:true});
    gsap.fromTo(".hero__glow--b", {scale:.8, x:60}, {scale:1.2, x:-40, duration:6, ease:"sine.inOut", repeat:-1, yoyo:true});
    gsap.to(".route", {strokeDashoffset:-180, duration:5, ease:"none", repeat:-1});
    gsap.to(".package", {keyframes:[
      {x:80, y:-25, duration:1.4},
      {x:220, y:-75, duration:1.2},
      {x:340, y:20, duration:1.3},
      {x:440, y:90, duration:1.2}
    ], ease:"power2.inOut", repeat:-1, repeatDelay:.3});
    gsap.to(".spark", {scale:2.4, opacity:.2, duration:.7, stagger:.35, repeat:-1, yoyo:true, ease:"sine.inOut"});

    reveal.forEach(el => {
      gsap.fromTo(el, {autoAlpha:0, y:35}, {
        autoAlpha:1, y:0, duration:.85, ease:"power3.out",
        scrollTrigger:{trigger:el, start:"top 84%", once:true}
      });
    });

    // Gran recorrido sincronizado con scroll.
    gsap.to(".journey__progress", {
      width:"100%", ease:"none",
      scrollTrigger:{trigger:".journey__track", start:"top 72%", end:"bottom 55%", scrub:1}
    });
    const journeySteps = gsap.utils.toArray(".journey-step");
    journeySteps.forEach((step, i) => {
      gsap.to(step, {
        y:0, opacity:1, ease:"power2.out",
        scrollTrigger:{
          trigger:step,
          start:"top 78%",
          end:"top 55%",
          scrub:1,
          onUpdate:self => step.style.setProperty("--fill", Math.round(self.progress * 100))
        }
      });
    });

    // Cada ruta de distribución se dibuja cuando entra la sección.
    gsap.utils.toArray(".import-route").forEach((path, i) => {
      const length = path.getTotalLength ? path.getTotalLength() : 200;
      gsap.set(path, {strokeDasharray:length + " " + length, strokeDashoffset:length});
      gsap.to(path, {
        strokeDashoffset:0,
        duration:1.25,
        delay:i*.13,
        ease:"power3.out",
        scrollTrigger:{trigger:".importer-visual", start:"top 75%", once:true}
      });
    });

    gsap.fromTo(".layer", {x:-35, opacity:0}, {
      x:0, opacity:1, stagger:.18, ease:"power3.out",
      scrollTrigger:{trigger:".layer-route", start:"top 75%", once:true}
    });

    gsap.fromTo(".network .node", {scale:0, opacity:0}, {
      scale:1, opacity:1, stagger:.08, ease:"back.out(1.8)",
      scrollTrigger:{trigger:".network", start:"top 75%", once:true}
    });

    gsap.to(".mobile-cta", {
      scrollTrigger:{trigger:".hero", start:"bottom top", onEnter:()=>document.getElementById("mobileCta")?.classList.add("is-visible"),
      onLeaveBack:()=>document.getElementById("mobileCta")?.classList.remove("is-visible")}
    });
  } else {
    reveal.forEach(el => el.classList.add("is-visible"));
  }

  // Selector de encaje
  const fitButtons = document.querySelectorAll(".fit-toggle button");
  const fitPanels = document.querySelectorAll(".fit-panel");
  fitButtons.forEach(btn => btn.addEventListener("click", () => {
    fitButtons.forEach(b => b.classList.remove("is-active"));
    fitPanels.forEach(p => p.classList.remove("is-active"));
    btn.classList.add("is-active");
    document.querySelector(`.fit-panel[data-panel="${btn.dataset.fit}"]`)?.classList.add("is-active");
  }));

  // FAQ: details nativo, sin JS obligatorio.

  // Formulario: no simular un backend real. Solo valida y deja el estado preparado.
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form && status) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const required = [...form.querySelectorAll("[required]")];
      const invalid = required.find(input => input.type === "checkbox" ? !input.checked : !input.value.trim());
      if (invalid) {
        status.textContent = "Completa los campos obligatorios antes de enviar.";
        status.style.color = "#e56b6f";
        invalid.focus();
        return;
      }
      const email = form.querySelector('[type="email"]');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        status.textContent = "Revisa el correo corporativo.";
        status.style.color = "#e56b6f";
        email.focus();
        return;
      }
      status.textContent = "Formulario listo para conectar con el backend. La página no simula una recepción exitosa.";
      status.style.color = "#b0de09";
    });
  }

  // Nav + barra móvil
  const nav = document.getElementById("navHeader");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("is-scrolled", window.scrollY > 10);
  }, {passive:true});
})();
