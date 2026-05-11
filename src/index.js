import { router } from './router.js';

// 1. Listen for the back/forward buttons
window.addEventListener('popstate', router);

// 2. Handle navigation clicks without refreshing the page
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-route]')) {
    e.preventDefault();
    const url = e.target.getAttribute('href');
    
    // Update the URL in the address bar without reloading
    window.history.pushState({}, '', url);
    
    // Call the router to update the view
    router();
  }
});

// 3. Initial load: render the correct view based on the current URL
window.addEventListener('DOMContentLoaded', router);