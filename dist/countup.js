// CountUp animation for statistics
document.addEventListener('DOMContentLoaded', function() {
  // Function to check if element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Format numbers with dots for thousands (German format)
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }
  
  const countupElements = document.querySelectorAll('.countup-number');
  let animationStarted = false;
  
  // Function to start the countup animations
  function startCountup() {
    if (animationStarted) return;
    
    let allVisible = true;
    countupElements.forEach(element => {
      if (!isInViewport(element)) {
        allVisible = false;
      }
    });
    
    if (allVisible) {
      animationStarted = true;
      
      countupElements.forEach(element => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // Animation duration in milliseconds
        const frameRate = 60; // Frames per second
        const increment = target / (duration / 1000 * frameRate);
        
        let current = 0;
        const counter = setInterval(() => {
          current += increment;
          
          // If target is large number, round to nearest integer
          const displayValue = target > 1000 ? Math.round(current) : Math.min(current, target).toFixed(0);
          
          // For large numbers (service hours), format with dots as thousand separators
          if (target > 10000) {
            element.textContent = formatNumber(displayValue);
          } else {
            element.textContent = displayValue;
          }
          
          if (current >= target) {
            clearInterval(counter);
            element.textContent = target > 10000 ? formatNumber(target) : target;
          }
        }, 1000 / frameRate);
      });
    }
  }
  
  // Check if elements are in viewport when page loads
  startCountup();
  
  // Check if elements are in viewport when scrolling
  window.addEventListener('scroll', startCountup);
});
