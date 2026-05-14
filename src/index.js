import { router } from './router.js';

window.addEventListener('popstate', router);

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-route]')) {
    e.preventDefault();
    const url = e.target.getAttribute('href');
    
    window.history.pushState({}, '', url);
    
    router();
  }
});

window.addEventListener('DOMContentLoaded', router);