// Main JavaScript
console.log('EVERRON Landing Page Loaded');

// Add any additional interactive features here

// Track CTA clicks (for analytics)
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-whatsapp').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        console.log('CTA clicked:', buttonText);

        // Add analytics tracking here
        // Example: gtag('event', 'cta_click', { button_text: buttonText });
    });
});

// Lazy load images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Performance monitoring
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});
