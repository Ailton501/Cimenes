document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out',
        offset: 120
    });

    // Navegación y transiciones entre secciones
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navUl = document.querySelector('.nav ul');

    // Mostrar solo la sección activa al cargar
    function showActiveSection() {
        const hash = window.location.hash || '#portada';
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === hash.substring(1)) {
                section.classList.add('active');
            }
        });

        // Actualizar enlace activo
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }

    // Cambiar sección al hacer clic en enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Ocultar menú en móvil
            if (navUl.classList.contains('show')) {
                navUl.classList.remove('show');
                hamburger.classList.remove('active');
            }

            // Transición entre secciones
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId.substring(1)) {
                    setTimeout(() => {
                        section.classList.add('active');
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            });

            // Actualizar enlace activo
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Cambiar URL sin recargar
            history.pushState(null, null, targetId);
        });
    });

    // Menú hamburguesa para móviles
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navUl.classList.toggle('show');
    });

    // Manejar cambios en el historial (atrás/adelante)
    window.addEventListener('popstate', showActiveSection);

    // Mostrar sección inicial
    showActiveSection();

    // Efecto parallax para imágenes de portada
    const portadaImgs = document.querySelectorAll('.portada-imagenes img');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        portadaImgs.forEach((img, index) => {
            const speed = index === 0 ? 0.2 : 0.1;
            img.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
});