(function () {
    'use strict';

    var reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    var hasGSAP = typeof window.gsap !== 'undefined';
    var ScrollTrigger = window.ScrollTrigger;

    if (hasGSAP && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    function qs(selector, root) {
        return (root || document).querySelector(selector);
    }

    function qsa(selector, root) {
        return Array.prototype.slice.call(
            (root || document).querySelectorAll(selector)
        );
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    /* =========================================================
       GLOBAL FX LAYER
    ========================================================= */

    function createFxLayer(section) {
        if (!section || qs('.fx-layer', section)) {
            return qs('.fx-layer', section);
        }

        var layer = document.createElement('div');
        layer.className = 'fx-layer';
        layer.setAttribute('aria-hidden', 'true');

        Object.assign(layer.style, {
            position: 'absolute',
            inset: '0',
            pointerEvents: 'none',
            overflow: 'hidden',
            zIndex: '0'
        });

        section.insertBefore(layer, section.firstChild);

        return layer;
    }

    function createParticles(section, amount) {
        if (!hasGSAP || reducedMotion || !section) return;

        var layer = createFxLayer(section);
        var count = amount || 10;

        for (var i = 0; i < count; i++) {
            var particle = document.createElement('span');

            particle.className = 'fx-particle';

            var size = 1 + Math.random() * 3;

            Object.assign(particle.style, {
                position: 'absolute',
                width: size + 'px',
                height: size + 'px',
                borderRadius: '50%',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                background:
                    Math.random() > 0.52
                        ? '#04defd'
                        : '#3703d6',
                opacity: '0',
                boxShadow:
                    '0 0 ' + (5 + Math.random() * 12) + 'px currentColor'
            });

            layer.appendChild(particle);

            gsap.to(particle, {
                opacity: 0.18 + Math.random() * 0.42,
                x: -30 + Math.random() * 60,
                y: -45 + Math.random() * 90,
                scale: 0.4 + Math.random() * 1.5,
                duration: 3.5 + Math.random() * 4,
                delay: Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }

    function pulseElement(element, options) {
        if (!element || !hasGSAP || reducedMotion) return;

        var settings = options || {};

        gsap.to(element, {
            scale: settings.scale || 1.18,
            opacity: settings.opacity || 0.18,
            duration: settings.duration || 0.8,
            repeat: -1,
            yoyo: true,
            delay: settings.delay || 0,
            ease: 'sine.inOut',
            transformOrigin: 'center center'
        });
    }

    function burstAt(parent, x, y, count, color) {
        if (!hasGSAP || reducedMotion || !parent) return;

        var layer = createFxLayer(parent);
        var total = count || 8;

        for (var i = 0; i < total; i++) {
            var dot = document.createElement('span');
            var angle = (Math.PI * 2 * i) / total;
            var distance = 18 + Math.random() * 28;

            Object.assign(dot.style, {
                position: 'absolute',
                left: x + 'px',
                top: y + 'px',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: color || '#04defd',
                opacity: '1',
                boxShadow: '0 0 10px ' + (color || '#04defd')
            });

            layer.appendChild(dot);

            gsap.to(dot, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: 0,
                opacity: 0,
                duration: 0.5 + Math.random() * 0.25,
                ease: 'power2.out',
                onComplete: function () {
                    if (dot.parentNode) {
                        dot.parentNode.removeChild(dot);
                    }
                }
            });
        }
    }

    /* =========================================================
       NAVIGATION
    ========================================================= */

    function initNavigation() {
        var header = qs('#siteHeader');
        var toggle = qs('#menuToggle');
        var nav = qs('#mainNav');
        var mobileCta = qs('#mobileCta');

        if (header) {
            function syncHeader() {
                var scrolled = window.scrollY > 18;

                header.classList.toggle('scrolled', scrolled);

                if (mobileCta) {
                    mobileCta.classList.toggle(
                        'is-visible',
                        window.scrollY > window.innerHeight * 0.55
                    );
                }
            }

            syncHeader();

            window.addEventListener('scroll', syncHeader, {
                passive: true
            });
        }

        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');

            toggle.setAttribute(
                'aria-expanded',
                String(open)
            );
        });

        qsa('a', nav).forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('is-open');
                toggle.setAttribute(
                    'aria-expanded',
                    'false'
                );
            });
        });

        document.addEventListener('keydown', function (event) {
            if (
                event.key === 'Escape' &&
                nav.classList.contains('is-open')
            ) {
                nav.classList.remove('is-open');
                toggle.setAttribute(
                    'aria-expanded',
                    'false'
                );
                toggle.focus();
            }
        });
    }

    /* =========================================================
       HERO — ESCENA PRINCIPAL
    ========================================================= */

    function createPathTracer(svg, path, color, duration, delay) {
        if (!hasGSAP || reducedMotion || !svg || !path) {
            return;
        }

        var length = path.getTotalLength();

        if (!length) return;

        var tracer = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle'
        );

        tracer.setAttribute('r', '4');
        tracer.setAttribute('fill', color);
        tracer.setAttribute(
            'filter',
            'url(#softGlow)'
        );

        svg.appendChild(tracer);

        var state = {
            progress: 0
        };

        gsap.to(state, {
            progress: 1,
            duration: duration || 5,
            delay: delay || 0,
            repeat: -1,
            ease: 'none',
            onUpdate: function () {
                var point = path.getPointAtLength(
                    length * state.progress
                );

                tracer.setAttribute('cx', point.x);
                tracer.setAttribute('cy', point.y);
            }
        });
    }

    function initHeroMotion() {
        var hero = qs('.hero');
        var svg = qs('.hero-visual svg');

        if (!hero || !svg) return;

        createParticles(hero, 12);

        var mainRoute = qs('.route-main', svg);
        var faintRoutes = qsa(
            '.route-faint',
            svg
        );

        if (reducedMotion) {
            qsa(
                '.hero-copy, .hero-visual',
                hero
            ).forEach(function (element) {
                element.style.opacity = '1';
            });

            return;
        }

        if (!hasGSAP) return;

        var timeline = gsap.timeline({
            defaults: {
                ease: 'power3.out'
            }
        });

        timeline
            .from('.hero-copy .eyebrow', {
                y: 22,
                opacity: 0,
                duration: 0.5
            })
            .from('.hero-copy h1', {
                y: 45,
                opacity: 0,
                duration: 0.9
            }, '-=.25')
            .from('.hero-lead', {
                y: 25,
                opacity: 0,
                duration: 0.65
            }, '-=.55')
            .from('.hero-actions', {
                y: 20,
                opacity: 0,
                duration: 0.55
            }, '-=.35')
            .from('.hero-proof', {
                y: 18,
                opacity: 0,
                duration: 0.6
            }, '-=.35')
            .from('.micro-note', {
                opacity: 0,
                duration: 0.45
            }, '-=.3')
            .from('.hero-visual', {
                x: 60,
                opacity: 0,
                scale: 0.92,
                duration: 1
            }, '-=.8');

        if (mainRoute) {
            gsap.set(mainRoute, {
                strokeDasharray: 8,
                strokeDashoffset: 700
            });

            gsap.to(mainRoute, {
                strokeDashoffset: -700,
                duration: 7,
                repeat: -1,
                ease: 'none'
            });

            createPathTracer(
                svg,
                mainRoute,
                '#04defd',
                4.2,
                0.3
            );

            createPathTracer(
                svg,
                mainRoute,
                '#ffffff',
                6.8,
                2.1
            );
        }

        faintRoutes.forEach(function (path, index) {
            gsap.fromTo(
                path,
                {
                    opacity: 0.03
                },
                {
                    opacity: 0.2,
                    duration: 2.2,
                    delay: index * 0.15,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                }
            );
        });

        gsap.to('.hero-box', {
            x: 55,
            y: -8,
            rotation: -2,
            duration: 3.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.hero-tag', {
            x: -12,
            y: -7,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.hero-event', {
            scale: 1.35,
            opacity: 0,
            duration: 1.4,
            repeat: -1,
            ease: 'power2.out',
            transformOrigin: 'center center'
        });

        qsa('.node', svg).forEach(function (node, index) {
            gsap.to(node, {
                scale: index === 2 ? 1.45 : 1.18,
                opacity: index === 2 ? 0.85 : 0.7,
                duration: 1.2 + index * 0.12,
                repeat: -1,
                yoyo: true,
                delay: index * 0.18,
                ease: 'sine.inOut',
                transformOrigin: 'center center'
            });
        });

        /*
          Parallax suave con mouse.
        */
        if (window.matchMedia('(pointer:fine)').matches) {
            var visual = qs('.hero-visual');

            hero.addEventListener(
                'pointermove',
                function (event) {
                    var rect = hero.getBoundingClientRect();

                    var x =
                        ((event.clientX - rect.left) / rect.width -
                            0.5) *
                        2;

                    var y =
                        ((event.clientY - rect.top) / rect.height -
                            0.5) *
                        2;

                    gsap.to(visual, {
                        x: x * 10,
                        y: y * 8,
                        duration: 0.8,
                        overwrite: true,
                        ease: 'power2.out'
                    });
                },
                { passive: true }
            );

            hero.addEventListener(
                'pointerleave',
                function () {
                    gsap.to(visual, {
                        x: 0,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                }
            );
        }
    }

    /* =========================================================
       SCROLL REVEALS
    ========================================================= */

    function initReveals() {
        var elements = qsa(
            '.section-head,' +
            '.problem-source,' +
            '.problem-core,' +
            '.cap-panel,' +
            '.service-band,' +
            '.fit-copy,' +
            '.fit-diagnostic,' +
            '.backup-copy,' +
            '.network-panel,' +
            '.onboarding-line article,' +
            '.faq-item,' +
            '.contact-copy,' +
            '.contact-form'
        );

        elements.forEach(function (element) {
            element.classList.add('reveal');
        });

        if (
            reducedMotion ||
            !('IntersectionObserver' in window)
        ) {
            elements.forEach(function (element) {
                element.classList.add('is-in');
            });

            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add('is-in');

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.08,
                rootMargin: '0px 0px -45px'
            }
        );

        elements.forEach(function (element) {
            observer.observe(element);
        });
    }

    /* =========================================================
       PROBLEMA — CONVERGENCIA
    ========================================================= */

    function initProblemMotion() {
        var scene = qs('#problemScene');

        if (!scene || reducedMotion || !hasGSAP) {
            return;
        }

        createParticles(
            qs('.problem-section'),
            7
        );

        if (ScrollTrigger) {
            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scene,
                    start: 'top 72%',
                    once: true
                }
            });

            tl.fromTo(
                '.problem-source',
                {
                    y: 40,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.14,
                    duration: 0.8,
                    ease: 'power3.out'
                }
            )
                .fromTo(
                    '.problem-flow .line',
                    {
                        scaleX: 0,
                        opacity: 0
                    },
                    {
                        scaleX: 1,
                        opacity: 1,
                        stagger: 0.14,
                        duration: 1.1,
                        ease: 'power3.inOut'
                    },
                    '-=.55'
                )
                .fromTo(
                    '.problem-core',
                    {
                        scale: 0.65,
                        opacity: 0,
                        rotation: -4
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        duration: 0.95,
                        ease: 'back.out(1.6)'
                    },
                    '-=.45'
                );

            gsap.to('.problem-core', {
                boxShadow:
                    '0 0 0 1px rgba(55,3,214,.1), 0 20px 65px rgba(55,3,214,.15)',
                duration: 1.4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }

    /* =========================================================
       CAPABILIDADES — RUTAS VIVAS
    ========================================================= */

    function initCapabilities() {
        var map = qs('#capabilityMap');

        if (!map) return;

        var panels = qsa(
            '.cap-panel',
            map
        );

        var lines = {
            commercial: qs('.commercial-line', map),
            logistics: qs('.logistics-line', map),
            fulfillment: qs('.fulfillment-line', map)
        };

        function activate(panel) {
            var type = panel.dataset.cap;

            panels.forEach(function (item) {
                item.classList.toggle(
                    'active',
                    item === panel
                );
            });

            Object.keys(lines).forEach(function (key) {
                if (!lines[key]) return;

                gsap.to(lines[key], {
                    opacity:
                        key === type ? 1 : 0.12,
                    strokeWidth:
                        key === type ? 4 : 1.5,
                    duration: 0.35,
                    overwrite: true
                });
            });

            if (
                hasGSAP &&
                !reducedMotion
            ) {
                burstAt(
                    panel,
                    panel.offsetWidth * 0.82,
                    panel.offsetHeight * 0.5,
                    10,
                    type === 'commercial'
                        ? '#3703d6'
                        : type === 'logistics'
                            ? '#04defd'
                            : '#47d17b'
                );
            }
        }

        panels.forEach(function (panel) {
            panel.addEventListener(
                'mouseenter',
                function () {
                    activate(panel);
                }
            );

            panel.addEventListener(
                'focusin',
                function () {
                    activate(panel);
                }
            );

            panel.addEventListener(
                'mouseleave',
                function () {
                    panels.forEach(function (item) {
                        item.classList.remove('active');
                    });

                    if (hasGSAP) {
                        Object.keys(lines).forEach(function (key) {
                            if (!lines[key]) return;

                            gsap.to(lines[key], {
                                opacity: 0.5,
                                strokeWidth: 2,
                                duration: 0.3
                            });
                        });
                    }
                }
            );
        });

        if (hasGSAP && !reducedMotion) {
            qsa('.cap-node', map).forEach(
                function (node, index) {
                    gsap.to(node, {
                        scale: 1.55,
                        opacity: 0.35,
                        duration: 1.1,
                        repeat: -1,
                        yoyo: true,
                        delay: index * 0.25,
                        ease: 'sine.inOut'
                    });
                }
            );

            qsa('.cap-line', map).forEach(
                function (line) {
                    var length = line.getTotalLength();

                    gsap.set(line, {
                        strokeDasharray: length,
                        strokeDashoffset: length
                    });

                    gsap.to(line, {
                        strokeDashoffset: 0,
                        duration: 1.6,
                        ease: 'power3.out',
                        scrollTrigger: ScrollTrigger
                            ? {
                                trigger: map,
                                start: 'top 78%',
                                once: true
                            }
                            : undefined
                    });
                }
            );
        }
    }

    /* =========================================================
       PROCESS — ANIMACIÓN PROTAGONISTA
    ========================================================= */

    function initProcess() {
        var route = qs('#processRoute');
        var steps = qsa('.process-step');

        if (!route || !steps.length) return;

        var progress = qs(
            '.route-progress',
            route
        );

        var packet = qs(
            '.process-packet',
            route
        );

        var track = qs(
            '.route-track',
            route
        );

        function setStep(index) {
            index = clamp(
                index,
                0,
                steps.length - 1
            );

            steps.forEach(function (step, i) {
                step.classList.toggle(
                    'active',
                    i === index
                );
            });

            var ratio =
                steps.length === 1
                    ? 1
                    : index / (steps.length - 1);

            if (progress) {
                if (hasGSAP && !reducedMotion) {
                    gsap.to(progress, {
                        width: ratio * 100 + '%',
                        duration: 0.55,
                        ease: 'power3.out'
                    });
                } else {
                    progress.style.width =
                        ratio * 100 + '%';
                }
            }

            if (packet && track) {
                var left =
                    38 +
                    (track.clientWidth - 76) *
                    ratio;

                if (
                    hasGSAP &&
                    !reducedMotion
                ) {
                    gsap.to(packet, {
                        left: left,
                        duration: 0.65,
                        ease: 'power3.inOut'
                    });
                } else {
                    packet.style.left =
                        left + 'px';
                }

                if (
                    hasGSAP &&
                    !reducedMotion
                ) {
                    burstAt(
                        route,
                        left,
                        86,
                        7,
                        '#04defd'
                    );
                }
            }

            if (
                hasGSAP &&
                !reducedMotion
            ) {
                var activeNode = qs(
                    '.step-node',
                    steps[index]
                );

                if (activeNode) {
                    gsap.fromTo(
                        activeNode,
                        {
                            scale: 0.85
                        },
                        {
                            scale: 1.12,
                            duration: 0.28,
                            yoyo: true,
                            repeat: 1,
                            ease: 'power2.out'
                        }
                    );
                }
            }
        }

        if (reducedMotion) {
            setStep(steps.length - 1);
            return;
        }

        if (hasGSAP && ScrollTrigger) {
            steps.forEach(function (step, index) {
                ScrollTrigger.create({
                    trigger: step,
                    start: 'top 70%',
                    end: 'bottom 42%',

                    onEnter: function () {
                        setStep(index);
                    },

                    onEnterBack: function () {
                        setStep(index);
                    }
                });
            });
        } else {
            var observer =
                new IntersectionObserver(
                    function (entries) {
                        entries.forEach(
                            function (entry) {
                                if (
                                    entry.isIntersecting
                                ) {
                                    setStep(
                                        Number(
                                            entry.target.dataset.step
                                        )
                                    );
                                }
                            }
                        );
                    },
                    {
                        threshold: 0.55
                    }
                );

            steps.forEach(function (step) {
                observer.observe(step);
            });
        }

        if (hasGSAP) {
            gsap.to('.process-packet .mini-box', {
                y: -4,
                rotation: -2,
                duration: 0.85,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            gsap.to('.route-progress', {
                opacity: 0.75,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }

        window.addEventListener(
            'resize',
            function () {
                var active =
                    steps.findIndex(
                        function (step) {
                            return step.classList.contains(
                                'active'
                            );
                        }
                    );

                setStep(
                    active < 0 ? 0 : active
                );
            }
        );

        setStep(0);
    }

    /* =========================================================
       SERVICIOS — 3 MICROESCENAS
    ========================================================= */

    function initServices() {
        if (!hasGSAP || reducedMotion) return;

        qsa('.service-band').forEach(
            function (band) {
                var type =
                    band.dataset.service;

                createParticles(
                    band,
                    type === 'commercial'
                        ? 5
                        : 7
                );

                if (type === 'commercial') {
                    var cards = qsa(
                        '.catalog-card',
                        band
                    );

                    gsap.fromTo(
                        cards,
                        {
                            y: 28,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            stagger: 0.12,
                            duration: 0.7,
                            ease: 'power3.out',
                            scrollTrigger: ScrollTrigger
                                ? {
                                    trigger: band,
                                    start: 'top 78%',
                                    once: true
                                }
                                : undefined
                        }
                    );

                    gsap.to(cards, {
                        y: -10,
                        rotation: function (index) {
                            return index === 1 ? 2 : -1;
                        },
                        duration: 2.1,
                        stagger: 0.22,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    });

                    gsap.to(
                        '.catalog-order',
                        {
                            x: -25,
                            opacity: 0.6,
                            duration: 2.4,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        }
                    );

                    gsap.to(
                        '.catalog-order',
                        {
                            boxShadow:
                                '0 0 26px rgba(55,3,214,.24)',
                            duration: 1.2,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        }
                    );
                }

                if (type === 'logistics') {
                    var box = qs(
                        '.inventory-box',
                        band
                    );

                    var pin = qs(
                        '.inventory-pin',
                        band
                    );

                    gsap.to(box, {
                        x: 150,
                        duration: 2.8,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    });

                    gsap.to(pin, {
                        scale: 1.35,
                        opacity: 0.55,
                        duration: 0.9,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut'
                    });

                    gsap.to(
                        '.dispatch-line',
                        {
                            scaleX: 0,
                            transformOrigin:
                                'left center',
                            duration: 1.8,
                            repeat: -1,
                            ease: 'power2.inOut'
                        }
                    );

                    gsap.to(
                        '.inventory-grid',
                        {
                            opacity: 0.35,
                            duration: 1.5,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        }
                    );
                }

                if (type === 'fulfillment') {
                    var cardsFinance =
                        qsa(
                            '.finance-card',
                            band
                        );

                    gsap.fromTo(
                        cardsFinance,
                        {
                            y: 18,
                            opacity: 0
                        },
                        {
                            y: 0,
                            opacity: 1,
                            stagger: 0.18,
                            duration: 0.65,
                            ease: 'back.out(1.4)',
                            scrollTrigger: ScrollTrigger
                                ? {
                                    trigger: band,
                                    start: 'top 80%',
                                    once: true
                                }
                                : undefined
                        }
                    );

                    gsap.to(
                        '.finance-check',
                        {
                            scale: 1.22,
                            rotation: 8,
                            opacity: 0.8,
                            duration: 0.75,
                            repeat: -1,
                            yoyo: true,
                            ease: 'sine.inOut'
                        }
                    );

                    gsap.to(
                        '.finance-arrow',
                        {
                            opacity: 0.35,
                            duration: 0.65,
                            repeat: -1,
                            yoyo: true,
                            stagger: 0.18,
                            ease: 'sine.inOut'
                        }
                    );
                }
            }
        );
    }

    /* =========================================================
       IMPORTADORES
    ========================================================= */

    function initImporterMotion() {
        var section =
            qs('.importer');

        var svg =
            qs('.import-route', section);

        if (
            !section ||
            !svg ||
            reducedMotion ||
            !hasGSAP
        ) {
            return;
        }

        createParticles(section, 8);

        var paths =
            qsa('path', svg);

        paths.forEach(
            function (path, index) {
                var length =
                    path.getTotalLength();

                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset:
                        length
                });

                gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: 1.8,
                    delay: index * 0.25,
                    ease: 'power3.out'
                });

                createPathTracer(
                    svg,
                    path,
                    index === 0
                        ? '#04defd'
                        : '#3703d6',
                    4.7 + index,
                    index * 0.8
                );
            }
        );

        gsap.to('.moving-packet', {
            x: 180,
            y: -14,
            rotation: 3,
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        qsa(
            '.origin-line i'
        ).forEach(function (dash, index) {
            gsap.to(dash, {
                opacity: 0.2,
                duration: 0.65,
                delay: index * 0.16,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        });
    }

    /* =========================================================
       RESPALDO — RED ENERGIZADA
    ========================================================= */

    function initNetworkMotion() {
        var panel =
            qs('.network-panel');

        var svg =
            qs('.network-art', panel);

        if (
            !panel ||
            !svg ||
            reducedMotion ||
            !hasGSAP
        ) {
            return;
        }

        createParticles(panel, 9);

        var lines =
            qsa('.net-lines path', svg);

        lines.forEach(
            function (line, index) {
                var length =
                    line.getTotalLength();

                gsap.set(line, {
                    strokeDasharray:
                        length,
                    strokeDashoffset:
                        length
                });

                gsap.to(line, {
                    strokeDashoffset: 0,
                    duration: 1.3,
                    delay: index * 0.12,
                    ease: 'power2.out',
                    scrollTrigger: ScrollTrigger
                        ? {
                            trigger: panel,
                            start: 'top 78%',
                            once: true
                        }
                        : undefined
                });

                createPathTracer(
                    svg,
                    line,
                    index % 2 === 0
                        ? '#04defd'
                        : '#3703d6',
                    4.2 + index * 0.3,
                    index * 0.45
                );
            }
        );

        qsa('.city circle', svg).forEach(
            function (node, index) {
                gsap.to(node, {
                    scale: 1.55,
                    opacity: 0.28,
                    duration:
                        1.1 + index * 0.08,
                    repeat: -1,
                    yoyo: true,
                    delay: index * 0.14,
                    ease: 'sine.inOut',
                    transformOrigin:
                        'center center'
                });
            }
        );

        gsap.from('.city', {
            opacity: 0,
            scale: 0.75,
            stagger: 0.12,
            duration: 0.7,
            ease: 'back.out(1.5)',
            scrollTrigger: ScrollTrigger
                ? {
                    trigger: panel,
                    start: 'top 70%',
                    once: true
                }
                : undefined
        });
    }

    /* =========================================================
       FIT DIAGNOSTIC
    ========================================================= */

    function initFit() {
        var wrap =
            qs('#fitDiagnostic');

        if (!wrap) return;

        var checks =
            qsa(
                'input[type="checkbox"]',
                wrap
            );

        var result =
            qs(
                '#diagnosticResult',
                wrap
            );

        if (!result) return;

        function update() {
            var count =
                checks.filter(function (input) {
                    return input.checked;
                }).length;

            if (
                hasGSAP &&
                !reducedMotion
            ) {
                gsap.fromTo(
                    result,
                    {
                        scale: 0.985
                    },
                    {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    }
                );
            }

            if (count === 0) {
                result.innerHTML =
                    '<small>RESULTADO</small>' +
                    '<strong>Selecciona señales para evaluar el encaje</strong>';

                return;
            }

            if (count >= 4) {
                result.innerHTML =
                    '<small>RESULTADO</small>' +
                    '<strong>Hay señales claras de encaje con Ervi.</strong>';

                if (
                    hasGSAP &&
                    !reducedMotion
                ) {
                    burstAt(
                        wrap,
                        wrap.clientWidth * 0.8,
                        wrap.clientHeight - 60,
                        12,
                        '#04defd'
                    );
                }

                return;
            }

            if (count >= 2) {
                result.innerHTML =
                    '<small>RESULTADO</small>' +
                    '<strong>Hay señales de encaje. Conviene revisar la operación.</strong>';

                return;
            }

            result.innerHTML =
                '<small>RESULTADO</small>' +
                '<strong>Aún faltan señales para evaluar el encaje.</strong>';
        }

        checks.forEach(function (input) {
            input.addEventListener(
                'change',
                update
            );
        });

        update();
    }

    /* =========================================================
       ONBOARDING
    ========================================================= */

    function initOnboarding() {
        var line =
            qs('#onboardingLine');

        if (!line || !hasGSAP) return;

        var articles =
            qsa('article', line);

        if (reducedMotion) return;

        gsap.fromTo(
            articles,
            {
                y: 35,
                opacity: 0,
                scale: 0.94
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.09,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: ScrollTrigger
                    ? {
                        trigger: line,
                        start: 'top 78%',
                        once: true
                    }
                    : undefined
            }
        );

        gsap.to(
            '.onboarding-line:before',
            {
                scaleX: 1,
                transformOrigin:
                    'left center',
                duration: 1.8,
                ease: 'power3.inOut',
                scrollTrigger: ScrollTrigger
                    ? {
                        trigger: line,
                        start: 'top 78%',
                        once: true
                    }
                    : undefined
            }
        );

        qsa(
            '.artifact',
            line
        ).forEach(function (artifact, index) {
            gsap.to(artifact, {
                y: -5,
                rotation:
                    index % 2 === 0 ? 2 : -2,
                duration:
                    1.5 + index * 0.08,
                repeat: -1,
                yoyo: true,
                delay: index * 0.12,
                ease: 'sine.inOut'
            });
        });
    }

    /* =========================================================
       FAQ
    ========================================================= */

    function initFAQ() {
        qsa('.faq-question').forEach(
            function (button) {
                var targetId =
                    button.getAttribute(
                        'aria-controls'
                    );

                var answer =
                    targetId
                        ? qs('#' + targetId)
                        : null;

                if (!answer) return;

                button.addEventListener(
                    'click',
                    function () {
                        var open =
                            button.getAttribute(
                                'aria-expanded'
                            ) === 'true';

                        qsa('.faq-question').forEach(
                            function (otherButton) {
                                if (
                                    otherButton === button
                                ) {
                                    return;
                                }

                                otherButton.setAttribute(
                                    'aria-expanded',
                                    'false'
                                );

                                var otherAnswer =
                                    qs(
                                        '#' +
                                        otherButton.getAttribute(
                                            'aria-controls'
                                        )
                                    );

                                if (otherAnswer) {
                                    otherAnswer.style.height =
                                        '0px';
                                }
                            }
                        );

                        button.setAttribute(
                            'aria-expanded',
                            String(!open)
                        );

                        if (open) {
                            answer.style.height =
                                '0px';
                        } else {
                            answer.style.height =
                                answer.scrollHeight +
                                'px';

                            if (
                                hasGSAP &&
                                !reducedMotion
                            ) {
                                var icon =
                                    qs(
                                        '.faq-icon',
                                        button
                                    );

                                if (icon) {
                                    gsap.fromTo(
                                        icon,
                                        {
                                            rotation: 0
                                        },
                                        {
                                            rotation: 45,
                                            duration: 0.3,
                                            ease: 'power2.out'
                                        }
                                    );
                                }
                            }
                        }
                    }
                );
            }
        );
    }

    /* =========================================================
       CONTACTO — RUTA FINAL
    ========================================================= */

    function initContactMotion() {
        var section =
            qs('#contacto');

        if (
            !section ||
            !hasGSAP ||
            reducedMotion
        ) {
            return;
        }

        var activeRoute =
            qs('.route-active', section);

        var dots =
            qsa('.route-dot', section);

        gsap.fromTo(
            activeRoute,
            {
                scaleX: 0
            },
            {
                scaleX: 1,
                transformOrigin:
                    'left center',
                duration: 1.6,
                ease: 'power3.out',
                scrollTrigger: ScrollTrigger
                    ? {
                        trigger: section,
                        start: 'top 72%',
                        once: true
                    }
                    : undefined
            }
        );

        dots.forEach(function (dot, index) {
            gsap.to(dot, {
                scale: 1.35,
                duration: 0.85,
                repeat: -1,
                yoyo: true,
                delay: index * 0.2,
                ease: 'sine.inOut'
            });
        });

        gsap.to(
            '.contact:after',
            {
                scale: 1.08,
                opacity: 0.75,
                duration: 2.6,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            }
        );
    }

    /* =========================================================
       FORM
    ========================================================= */

    function initForm() {
        var form =
            qs('#contactForm');

        var status =
            qs('#formStatus');

        if (!form || !status) {
            return;
        }

        /*
          Conecta aquí el endpoint real.
    
          Ejemplo:
    
          var endpoint = '/api/contacto';
    
          Nunca se muestra éxito mientras no exista
          confirmación real del backend.
        */
        var endpoint = '';

        function setStatus(
            message,
            type
        ) {
            status.className =
                'form-status ' +
                (type || '');

            status.textContent =
                message;

            if (
                hasGSAP &&
                !reducedMotion
            ) {
                gsap.fromTo(
                    status,
                    {
                        y: 8,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.35,
                        ease: 'power2.out'
                    }
                );
            }
        }

        form.addEventListener(
            'input',
            function (event) {
                var target =
                    event.target;

                if (
                    !target.matches(
                        'input, select, textarea'
                    )
                ) {
                    return;
                }

                if (
                    target.value.trim() ||
                    target.type ===
                    'checkbox'
                ) {
                    target.setAttribute(
                        'aria-invalid',
                        'false'
                    );
                }
            }
        );

        form.addEventListener(
            'submit',
            function (event) {
                event.preventDefault();

                var required =
                    qsa(
                        '[required]',
                        form
                    );

                var valid = true;

                required.forEach(
                    function (field) {
                        var value =
                            field.type ===
                                'checkbox'
                                ? field.checked
                                : field.value.trim();

                        field.setAttribute(
                            'aria-invalid',
                            value
                                ? 'false'
                                : 'true'
                        );

                        if (!value) {
                            valid = false;
                        }
                    }
                );

                var email =
                    qs(
                        'input[name="correo"]',
                        form
                    );

                if (
                    email &&
                    email.value &&
                    !/^\S+@\S+\.\S+$/.test(
                        email.value.trim()
                    )
                ) {
                    valid = false;

                    email.setAttribute(
                        'aria-invalid',
                        'true'
                    );
                }

                if (!valid) {
                    setStatus(
                        'Completa los campos obligatorios y revisa el correo.',
                        'error'
                    );

                    return;
                }

                if (!endpoint) {
                    setStatus(
                        'El formulario está listo, pero el backend de envío aún no está conectado. No se simula el envío.',
                        'error'
                    );

                    return;
                }

                var submit =
                    qs(
                        'button[type="submit"]',
                        form
                    );

                if (submit) {
                    submit.disabled = true;
                    submit.dataset.originalText =
                        submit.textContent;

                    submit.textContent =
                        'Enviando…';
                }

                setStatus(
                    'Enviando solicitud…',
                    ''
                );

                fetch(
                    endpoint,
                    {
                        method: 'POST',
                        body: new FormData(form),
                        headers: {
                            Accept:
                                'application/json'
                        }
                    }
                )
                    .then(function (response) {
                        if (!response.ok) {
                            throw new Error(
                                'request_failed'
                            );
                        }

                        return response;
                    })
                    .then(function () {
                        setStatus(
                            'Solicitud enviada. Tu información fue recibida correctamente.',
                            'success'
                        );

                        form.reset();

                        if (
                            hasGSAP &&
                            !reducedMotion
                        ) {
                            burstAt(
                                section,
                                section.clientWidth * 0.72,
                                120,
                                18,
                                '#04defd'
                            );
                        }
                    })
                    .catch(function () {
                        setStatus(
                            'No pudimos enviar la solicitud. Revisa tu conexión o utiliza el canal alternativo de contacto.',
                            'error'
                        );
                    })
                    .finally(function () {
                        if (submit) {
                            submit.disabled = false;
                            submit.textContent =
                                submit.dataset.originalText ||
                                'Solicitar diagnóstico';
                        }
                    });
            }
        );
    }

    /* =========================================================
       SCROLL PARALLAX — SOLO ELEMENTOS DECORATIVOS
    ========================================================= */

    function initParallax() {
        if (
            reducedMotion ||
            !hasGSAP ||
            !ScrollTrigger
        ) {
            return;
        }

        qsa(
            '.scene, .network-panel, .service-scene'
        ).forEach(function (element) {
            gsap.to(element, {
                y: -18,
                ease: 'none',
                scrollTrigger: {
                    trigger:
                        element.closest(
                            '.section, .hero'
                        ) || element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.4
                }
            });
        });
    }

    /* =========================================================
       TEXT / SECTION TRANSITIONS
    ========================================================= */

    function initHeadlineMotion() {
        if (
            reducedMotion ||
            !hasGSAP ||
            !ScrollTrigger
        ) {
            return;
        }

        qsa(
            '.section-head h2, .hero-copy h1'
        ).forEach(function (headline) {
            var spans =
                qsa('span', headline);

            if (!spans.length) {
                gsap.fromTo(
                    headline,
                    {
                        y: 24,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.75,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headline,
                            start: 'top 84%',
                            once: true
                        }
                    }
                );

                return;
            }

            gsap.fromTo(
                spans,
                {
                    yPercent: 55,
                    opacity: 0
                },
                {
                    yPercent: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.65,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headline,
                        start: 'top 84%',
                        once: true
                    }
                }
            );
        });
    }

    /* =========================================================
       INIT
    ========================================================= */

    function init() {
        initNavigation();
        initReveals();
        initHeroMotion();
        initProblemMotion();
        initCapabilities();
        initProcess();
        initServices();
        initImporterMotion();
        initNetworkMotion();
        initFit();
        initOnboarding();
        initFAQ();
        initContactMotion();
        initForm();
        initParallax();
        initHeadlineMotion();

        /*
          Después de crear dinámicamente los triggers,
          forzamos una medición correcta.
        */
        if (
            hasGSAP &&
            ScrollTrigger
        ) {
            requestAnimationFrame(function () {
                ScrollTrigger.refresh();
            });
        }
    }

    if (
        document.readyState ===
        'loading'
    ) {
        document.addEventListener(
            'DOMContentLoaded',
            init
        );
    } else {
        init();
    }
})();