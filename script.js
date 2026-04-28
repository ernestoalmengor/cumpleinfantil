document.addEventListener("DOMContentLoaded", () => {
    // 1. Lógica del Título Multicolor
    const titles = document.querySelectorAll('.multicolor-title');
    titles.forEach(title => {
        let text = title.getAttribute('data-text') || title.innerText;
        title.innerHTML = ''; // Limpiar el contenido original
        let colorIndex = 1;
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === ' ') {
                title.appendChild(document.createTextNode(' '));
            } else {
                const span = document.createElement('span');
                span.innerText = char;
                span.className = `multicolor-letter c-${colorIndex}`;
                title.appendChild(span);
                
                // Rotar entre los 4 colores (1: verde, 2: azul, 3: naranja, 4: amarillo)
                colorIndex = colorIndex >= 4 ? 1 : colorIndex + 1;
            }
        }
    });

    // 2. Lógica del Contador
    const fechaBoda = new Date("July 15, 2026 15:00:00").getTime(); 
    const countdownEl = document.getElementById("countdown");
    
    function actualizarContador() {
        const ahora = new Date().getTime();
        const distancia = fechaBoda - ahora;

        if (distancia <= 0) {
            countdownEl.innerHTML = `
                <div class="count-box" style="width: 100%;"><span style="font-size: 2rem;">¡Es hora de la fiesta!</span></div>
            `;
            return;
        }

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `
            <div class="count-box"><span>${dias}</span><small>Días</small></div>
            <div class="count-box"><span>${horas}</span><small>Hrs</small></div>
            <div class="count-box"><span>${minutos}</span><small>Min</small></div>
            <div class="count-box"><span>${segundos}</span><small>Seg</small></div>
        `;
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);

    // 3. Audio y Overlay (Entrada interactiva y Confeti)
    const audio = document.getElementById("musicaFondo");
    const playerBtn = document.getElementById("playerBtn");
    const overlay = document.getElementById("overlayEntrada");
    const btnEntrar = document.getElementById("btnEntrar");
    const body = document.body;

    function setPlayerState(sonando) {
        playerBtn.querySelector("i").className = sonando ? "ph-bold ph-pause" : "ph-bold ph-play";
    }

    function dispararConfeti() {
        if (typeof confetti === 'function') {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

            function randomInRange(min, max) { return Math.random() * (max - min) + min; }

            const interval = setInterval(function() {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) { return clearInterval(interval); }
                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }
    }

    function handleEntry() {
        body.classList.remove('no-scroll');
        overlay.classList.add("oculto");
        setTimeout(() => (overlay.style.display = "none"), 600);
        
        dispararConfeti();

        audio.play().then(() => {
            setPlayerState(true);
        }).catch((e) => {
            console.log("No se pudo reproducir el audio: " + e);
            setPlayerState(false);
        });
    }

    body.classList.add('no-scroll');
    btnEntrar.addEventListener("click", handleEntry);

    playerBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => setPlayerState(true));
        } else {
            audio.pause();
            setPlayerState(false);
        }
    });

    // 4. Animaciones de Scroll (Fade in)
    const revealElements = document.querySelectorAll(".fade-in");
    const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Slider de Galería
    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.getElementById('btnPrev');
    const btnNext = document.getElementById('btnNext');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
    }

    if (slides.length > 0) {
        btnPrev.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        btnNext.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 4000);
    }

    // 6. Botón de Subir al Inicio
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("visible");
            } else {
                scrollTopBtn.classList.remove("visible");
            }
        });
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});