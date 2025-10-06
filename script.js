document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------------------
    // 1. MODAL / PROJECT DETAIL INTERACTION
    // -----------------------------------------------------

    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-btn');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            
            if (targetModal) {
                let liveDemoUrl;
                let githubUrl;

                if (modalId === 'modal-1') { // EV Adoption Forecaster
                    liveDemoUrl = "https://ev-adoption-forecaster-demo.netlify.app";
                    githubUrl = "https://github.com/3sha507/EV-Adoption-Forecaster";
                } else if (modalId === 'modal-2') { // PreMaX
                    liveDemoUrl = "https://premax-predictive-maintenance.netlify.app";
                    githubUrl = "https://github.com/3sha507/PreMaX-Predictive-Maintenance";
                } else if (modalId === 'modal-3') { // COLORSENSE
                    liveDemoUrl = "https://colorsense-tool.netlify.app";
                    githubUrl = "https://github.com/3sha507/COLORSENSE-Detection-Tool";
                } else {
                    liveDemoUrl = "#";
                    githubUrl = "#";
                }

                targetModal.querySelector('.project-links a:nth-child(1)').href = liveDemoUrl;
                targetModal.querySelector('.project-links a:nth-child(2)').href = githubUrl;

                targetModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = '';
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal();
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // -----------------------------------------------------
    // 2. PROJECT FILTERING LOGIC (FIXED)
    // -----------------------------------------------------
    const filterTabs = document.querySelectorAll('.filter-tab');
    const projectCardsFilterable = document.querySelectorAll('.project-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filterValue = tab.getAttribute('data-filter');
            
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            projectCardsFilterable.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || (categories && categories.includes(filterValue))) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });


    // -----------------------------------------------------
    // 3. SCROLL ANIMATIONS (Intersection Observer)
    // -----------------------------------------------------

    const elementsToObserve = document.querySelectorAll('.section, .animate-on-scroll, .skill-list-item');

    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, options);

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    // ------------------------------------------------------------------
    // 4. Smooth Scrolling for Navigation Links
    // ------------------------------------------------------------------
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');

                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // -----------------------------------------------------
    // 5. SKILL BAR ANIMATION (Intersection Observer)
    // -----------------------------------------------------
    function activateSkillBars() {
        const skillContainers = document.querySelectorAll('.skill');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const proficiency = entry.target.getAttribute('data-proficiency');
                    const levelClass = entry.target.getAttribute('data-level'); 
                    const fillBar = entry.target.querySelector('.skill-fill');
                    
                    if (fillBar && proficiency) {
                        fillBar.classList.add(levelClass);
                        fillBar.style.width = `${proficiency}%`;
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1
        });

        skillContainers.forEach(item => {
            observer.observe(item);
        });
    }
    activateSkillBars();

    // -----------------------------------------------------
    // 6. FULL-SCREEN SCREENSHOT VIEW
    // -----------------------------------------------------
    function activateScreenshotClick() {
        const screenshotImgs = document.querySelectorAll('.detail-screenshot-img');

        screenshotImgs.forEach(img => {
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', () => {
                if (img.requestFullscreen) {
                    img.requestFullscreen();
                } else if (img.mozRequestFullScreen) {
                    img.mozRequestFullScreen();
                } else if (img.webkitRequestFullscreen) {
                    img.webkitRequestFullscreen();
                } else if (img.msRequestFullscreen) {
                    img.msRequestFullscreen();
                }
            });
        });
    }
    activateScreenshotClick();


    // -----------------------------------------------------
    // 7. AVATAR CLICK-TO-SWAP (Instagram Effect)
    // -----------------------------------------------------
    function setupAvatarClickSwap() {
        const mainAvatar = document.querySelector('.main-avatar-img');

        if (mainAvatar) {
            mainAvatar.style.cursor = 'pointer';

            mainAvatar.addEventListener('click', function() {
                const currentSrc = this.src;
                const nextSrc = this.dataset.secondSrc;

                this.dataset.secondSrc = currentSrc;
                this.src = nextSrc;
                
                this.classList.add('pulse-animation');
                setTimeout(() => {
                    this.classList.remove('pulse-animation');
                }, 500);
            });
        }
    }
    setupAvatarClickSwap(); 

    // -----------------------------------------------------
    // 8. SCROLL SPY LOGIC (Header Active Link Update)
    // -----------------------------------------------------

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');
    const headerHeight = document.querySelector('header').offsetHeight;

    function updateActiveNav() {
        const scrollY = window.pageYOffset + headerHeight + 10;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector('header nav a[href="#' + sectionId + '"]');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            }
        });
        
        if (window.pageYOffset < sections[0].offsetTop - 10) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('header nav a[href="#about"]').classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveNav);

    updateActiveNav();
});