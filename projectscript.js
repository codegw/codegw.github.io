const observerOptions = {
  threshold: 0,
  rootMargin: '0px 0px -10px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const subtitleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetId = entry.target.id;
            const navLink = document.querySelector(`a[href="#${targetId}"]`);
            
            if (navLink) {
                const sectionNav = navLink.closest('.section-nav');
                sectionNav.querySelectorAll('a').forEach(link => link.classList.remove('active'));
                
                navLink.classList.add('active');
                
                const subtitle = navLink.getAttribute('data-subtitle');
                const subtitleElement = navLink.closest('.section-sidebar').querySelector('.current-subtitle');
                if (subtitle && subtitleElement && subtitleElement.textContent !== subtitle) {
                    subtitleElement.classList.add('fade-out');
                    setTimeout(() => {
                        subtitleElement.textContent = subtitle;
                        subtitleElement.classList.remove('fade-out');
                    }, 150);
                }
            }
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -30% 0px'

});

function setupSmoothScroll() {
    document.querySelectorAll('.section-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));

    const contentSections = document.querySelectorAll('.content-section-item');
    contentSections.forEach(el => subtitleObserver.observe(el));

    setupSmoothScroll();
});