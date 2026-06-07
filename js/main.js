/* =========================================================
   MCV Treuhand – Interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Web3Forms: get your free access key at https://web3forms.com ----
     Enter info@mcv-treuhand.ch there, copy the key and paste it below.   */
  var FORM_KEY = "45320b1e-366c-498a-8e46-9ff995cdb372";

  /* Always start at the top — prevent browser scroll restoration */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  /* --- Sticky nav: switch to solid style after a little scroll --- */
  const onScroll = () => {
    if (window.scrollY > 24) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- Mobile menu toggle --- */
  if (toggle && menu) {
    const closeMenu = () => {
      nav.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menü öffnen");
    };

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schliessen" : "Menü öffnen");
    });

    // Close after picking a link
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* --- Active link highlighting via section observer --- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((l) =>
              l.classList.toggle("active", l.getAttribute("href") === "#" + id)
            );
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* --- Reveal-on-scroll animations ---
     Mark <html> as js-loaded so CSS activates the hidden state,
     then immediately reveal anything already in the viewport. --- */
  document.documentElement.classList.add("js-loaded");
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

  /* --- Multi-step Contact Wizard --- */
  const wizard = document.getElementById("contactWizard");
  if (wizard) {
    let curStep = 1;
    let topic = "";
    let detail = "";

    const dots = Array.from(wizard.querySelectorAll(".wdot"));
    const gaps = Array.from(wizard.querySelectorAll(".wdot-gap"));
    const label = document.getElementById("wizLabel");

    const LABELS = {
      1: "Schritt 1 von 3 – Dein Anliegen",
      2: "Schritt 2 von 3 – Details",
      3: "Schritt 3 von 3 – Kontaktdaten",
      4: "Fertig!"
    };

    function goTo(n, skipScroll) {
      const cur = document.getElementById("wpanel-" + curStep);
      if (cur) cur.classList.remove("active");
      curStep = n;
      const next = document.getElementById("wpanel-" + n);
      if (next) { next.hidden = false; next.classList.add("active"); }

      const dotIdx = Math.min(n, 3) - 1;
      dots.forEach((d, i) => {
        d.classList.toggle("active", i === dotIdx);
        d.classList.toggle("done", i < dotIdx);
      });
      gaps.forEach((g, i) => g.classList.toggle("done", i < dotIdx));
      if (label) label.textContent = LABELS[n] || "";

      if (!skipScroll) {
        const top = wizard.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      }
    }

    // Step 1 – topic selection
    wizard.querySelectorAll("#wpanel-1 .wopt").forEach((btn) => {
      btn.addEventListener("click", () => {
        topic = btn.dataset.topic;
        wizard.querySelectorAll("#wpanel-1 .wopt").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");

        if (topic === "anderes") {
          setTimeout(() => goTo(3), 180);
        } else {
          wizard.querySelectorAll(".wsub").forEach((s) => { s.hidden = true; });
          const sub = document.getElementById("sub-" + topic);
          if (sub) sub.hidden = false;
          setTimeout(() => goTo(2), 180);
        }
      });
    });

    // Step 2 – detail selection
    wizard.querySelectorAll("#wpanel-2 .wopt").forEach((btn) => {
      btn.addEventListener("click", () => {
        detail = btn.textContent.trim();
        wizard.querySelectorAll("#wpanel-2 .wopt").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        setTimeout(() => goTo(3), 180);
      });
    });

    // Back buttons
    document.getElementById("wback-2")?.addEventListener("click", () => goTo(1));
    document.getElementById("wback-3")?.addEventListener("click", () =>
      goTo(topic === "anderes" ? 1 : 2)
    );

    // Contact form submit → send via Web3Forms → step 4
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!contactForm.checkValidity()) { contactForm.reportValidity(); return; }
        const btn = contactForm.querySelector('[type="submit"]');
        const origHTML = btn.innerHTML;
        btn.disabled = true;
        btn.textContent = "Wird gesendet…";
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: FORM_KEY,
            subject: "Neue Anfrage – Treuhand | MCV Treuhand",
            from_name: "MCV Treuhand Website",
            thema: topic,
            detail: detail,
            name: contactForm.querySelector('[name="name"]').value,
            email: contactForm.querySelector('[name="email"]').value,
            telefon: contactForm.querySelector('[name="phone"]').value,
            nachricht: contactForm.querySelector('[name="message"]').value,
          })
        })
        .then((r) => {
          if (r.ok) { contactForm.reset(); goTo(4); }
          else { btn.disabled = false; btn.innerHTML = origHTML; alert("Fehler beim Senden. Bitte ruf uns an: 031 561 91 13"); }
        })
        .catch(() => { btn.disabled = false; btn.innerHTML = origHTML; alert("Fehler beim Senden. Bitte ruf uns an: 031 561 91 13"); });
      });
    }

    goTo(1, true);
  }

  /* --- Solution wheel: activate node → fill center hub --- */
  const wheel = document.getElementById("solutionWheel");
  if (wheel) {
    const nodes = Array.from(wheel.querySelectorAll(".wheel__node"));
    const hubTitle = wheel.querySelector(".wheel__hub-title");
    const hubDesc = wheel.querySelector(".wheel__hub-desc");
    const hubBadge = wheel.querySelector(".wheel__hub-badge");

    const activate = (node) => {
      nodes.forEach((n) => {
        const on = n === node;
        n.classList.toggle("active", on);
        n.setAttribute("aria-pressed", String(on));
      });
      if (hubTitle) hubTitle.innerHTML = node.querySelector(".wheel__node-title").innerHTML;
      if (hubDesc) hubDesc.textContent = node.querySelector(".wheel__node-desc").textContent;
      if (hubBadge) hubBadge.textContent = node.querySelector(".wheel__node-badge").textContent;
    };

    nodes.forEach((node) => {
      node.addEventListener("click", () => activate(node));
      node.addEventListener("mouseenter", () => activate(node));
    });

    if (nodes.length) activate(nodes[0]);
  }

  /* --- Problem cards: tap to flip on touch devices --- */
  document.querySelectorAll(".problem").forEach((card) => {
    card.addEventListener("click", () => {
      const flipped = card.classList.toggle("flipped");
      if (flipped) {
        document.querySelectorAll(".problem.flipped").forEach((other) => {
          if (other !== card) other.classList.remove("flipped");
        });
      }
    });
  });

  /* --- Immobilien multi-step wizard --- */
  const immoWiz = document.getElementById("immoWizard");
  if (immoWiz) {
    let imCurStep = 1;
    let imTopic = "";
    let imDetail = "";

    const imDots = Array.from(immoWiz.querySelectorAll(".wdot"));
    const imGaps = Array.from(immoWiz.querySelectorAll(".wdot-gap"));
    const imLabel = document.getElementById("imwizLabel");

    const IM_LABELS = {
      1: "Schritt 1 von 3 – Dein Anliegen",
      2: "Schritt 2 von 3 – Details",
      3: "Schritt 3 von 3 – Kontaktdaten",
      4: "Fertig!"
    };

    function imGoTo(n, skipScroll) {
      const cur = document.getElementById("impanel-" + imCurStep);
      if (cur) cur.classList.remove("active");
      imCurStep = n;
      const next = document.getElementById("impanel-" + n);
      if (next) { next.hidden = false; next.classList.add("active"); }

      const dotIdx = Math.min(n, 3) - 1;
      imDots.forEach((d, i) => {
        d.classList.toggle("active", i === dotIdx);
        d.classList.toggle("done", i < dotIdx);
      });
      imGaps.forEach((g, i) => g.classList.toggle("done", i < dotIdx));
      if (imLabel) imLabel.textContent = IM_LABELS[n] || "";

      if (!skipScroll) {
        const top = immoWiz.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
      }
    }

    // Step 1 – topic selection
    immoWiz.querySelectorAll("#impanel-1 .wopt").forEach((btn) => {
      btn.addEventListener("click", () => {
        imTopic = btn.dataset.topic;
        immoWiz.querySelectorAll("#impanel-1 .wopt").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");

        if (imTopic === "anderes") {
          setTimeout(() => imGoTo(3), 180);
        } else {
          immoWiz.querySelectorAll(".wsub").forEach((s) => { s.hidden = true; });
          const sub = document.getElementById("imsub-" + imTopic);
          if (sub) sub.hidden = false;
          setTimeout(() => imGoTo(2), 180);
        }
      });
    });

    // Step 2 – detail selection
    immoWiz.querySelectorAll("#impanel-2 .wopt").forEach((btn) => {
      btn.addEventListener("click", () => {
        imDetail = btn.textContent.trim();
        immoWiz.querySelectorAll("#impanel-2 .wopt").forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
        setTimeout(() => imGoTo(3), 180);
      });
    });

    // Back buttons
    document.getElementById("imback-2")?.addEventListener("click", () => imGoTo(1));
    document.getElementById("imback-3")?.addEventListener("click", () =>
      imGoTo(imTopic === "anderes" ? 1 : 2)
    );

    // Contact form submit → send via Web3Forms → step 4
    const immoContactForm = document.getElementById("immoContactForm");
    if (immoContactForm) {
      immoContactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!immoContactForm.checkValidity()) { immoContactForm.reportValidity(); return; }
        const btn = immoContactForm.querySelector('[type="submit"]');
        const origHTML = btn.innerHTML;
        btn.disabled = true;
        btn.textContent = "Wird gesendet…";
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: FORM_KEY,
            subject: "Neue Anfrage – Immobilien | MCV Treuhand",
            from_name: "MCV Treuhand Website",
            dienstleistung: imTopic,
            detail: imDetail,
            name: immoContactForm.querySelector('[name="name"]').value,
            email: immoContactForm.querySelector('[name="email"]').value,
            telefon: immoContactForm.querySelector('[name="phone"]').value,
            nachricht: immoContactForm.querySelector('[name="message"]').value,
          })
        })
        .then((r) => {
          if (r.ok) { immoContactForm.reset(); imGoTo(4); }
          else { btn.disabled = false; btn.innerHTML = origHTML; alert("Fehler beim Senden. Bitte ruf uns an: 031 561 91 13"); }
        })
        .catch(() => { btn.disabled = false; btn.innerHTML = origHTML; alert("Fehler beim Senden. Bitte ruf uns an: 031 561 91 13"); });
      });
    }

    imGoTo(1, true);
  }

  /* --- Footer year --- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* --- Hero visual – portal progress bars (desktop + iPhone) --- */
  (function () {
    const fills = document.querySelectorAll(".pt-prog-fill");
    if (fills.length) {
      setTimeout(function () {
        fills.forEach(function (f) { f.style.width = "78%"; });
      }, 700);
    }
  })();
})();
