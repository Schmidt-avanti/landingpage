// JavaScript for Sticky Header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('stickyHeader');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initial check on page load
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
});
