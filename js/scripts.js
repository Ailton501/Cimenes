document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Inicializando scripts...');
    
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

    console.log('Secciones encontradas:', sections.length);
    console.log('Enlaces de navegación:', navLinks.length);

    // Función para OCULTAR TODAS las secciones excepto la activa
    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = 'none';
            section.style.opacity = '0';
            section.classList.remove('active');
        });
    }

    // Función para mostrar solo la sección activa
    function showActiveSection(targetId = null) {
        const hash = targetId || window.location.hash || '#portada';
        const targetSectionId = hash.substring(1);
        
        console.log('Mostrando sección:', targetSectionId);
        
        // Primero ocultar todas las secciones
        hideAllSections();
        
        // Mostrar solo la sección objetivo
        const targetSection = document.getElementById(targetSectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            
            // Animación de opacidad
            setTimeout(() => {
                targetSection.style.opacity = '1';
            }, 50);
            
            // Scroll al inicio
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Actualizar enlace activo
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }

    // Ocultar todas las secciones al inicio excepto portada
    hideAllSections();
    
    // Mostrar portada inicial
    const portadaSection = document.getElementById('portada');
    if (portadaSection) {
        portadaSection.style.display = 'block';
        portadaSection.classList.add('active');
        setTimeout(() => {
            portadaSection.style.opacity = '1';
        }, 50);
    }

    // Cambiar sección al hacer clic en enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            console.log('Clic en enlace:', targetId);
            
            // Ocultar menú en móvil
            if (navUl.classList.contains('show')) {
                navUl.classList.remove('show');
                hamburger.classList.remove('active');
            }

            // Cambiar a la sección seleccionada
            showActiveSection(targetId);

            // Cambiar URL sin recargar
            history.pushState(null, null, targetId);
        });
    });

    // Menú hamburguesa para móviles
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            if (navUl) {
                navUl.classList.toggle('show');
            }
        });
    }

    // Manejar cambios en el historial (atrás/adelante)
    window.addEventListener('popstate', function() {
        console.log('Cambio en historial');
        showActiveSection();
    });

    // Efecto parallax para imágenes de portada
    const portadaImgs = document.querySelectorAll('.portada-imagenes img');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        portadaImgs.forEach((img, index) => {
            const speed = index === 0 ? 0.2 : 0.1;
            img.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    // Función para el modal de QR
    function initQRModal() {
        const qrImages = document.querySelectorAll('.qr-img');
        const modal = document.getElementById('qrModal');
        const modalImg = document.getElementById('modalQrImg');
        const closeModal = document.querySelector('.close-modal');

        if (!modal || !modalImg || !closeModal) {
            console.log('Elementos del modal no encontrados');
            return;
        }

        // Abrir modal al hacer clic en cualquier QR
        qrImages.forEach(qr => {
            qr.addEventListener('click', function() {
                const qrSrc = this.getAttribute('data-qr-src') || this.src;
                modalImg.src = qrSrc;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // Cerrar modal al hacer clic en la X
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Cerrar modal al hacer clic fuera del contenido
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Cerrar modal con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Inicializar el modal de QR
    initQRModal();

    // Función para enlaces directos suaves
    function initEnlacesDirectos() {
        const enlacesDirectos = document.querySelectorAll('.enlace-directo');
        
        enlacesDirectos.forEach(enlace => {
            enlace.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                showActiveSection(targetId);
                history.pushState(null, null, targetId);
            });
        });
    }

    // Inicializar enlaces directos
    initEnlacesDirectos();

    console.log('Scripts inicializados correctamente');
});
