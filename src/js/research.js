// research.js — Controls view switching between list (text) and gallery.

document.addEventListener("DOMContentLoaded", function () {
    // Toggle view logic
    function showView(view) {
      document.getElementById('text-view').classList.toggle('hidden', view !== 'text');
      document.getElementById('gallery-view').classList.toggle('hidden', view !== 'gallery');

      const icons = document.querySelectorAll('.toggle-buttons i');
      icons.forEach(icon => icon.classList.remove('active'));

      if (view === 'text') {
        document.querySelector('.toggle-buttons i.fa-list-ul').classList.add('active');
      } else {
        document.querySelector('.toggle-buttons i.fa-grip').classList.add('active');
      }
    }

    // Expose to global scope for button onclick
    window.showView = showView;

    // Set default view
    showView('text'); // or 'gallery' depending on your preference
  });
