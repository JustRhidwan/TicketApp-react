// Simple toast notification helper
export default function toast(message, type = 'info', duration = 3000) {
  const toastContainer = document.querySelector('.toast-container') || (() => {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  })();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  const timeout = setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => {
      toast.remove();
      if (toastContainer.children.length === 0) {
        toastContainer.remove();
      }
    });
  }, duration);

  // Cleanup if component unmounts
  return () => {
    clearTimeout(timeout);
    toast.remove();
  };
}