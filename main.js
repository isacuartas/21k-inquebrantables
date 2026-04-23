import './style.css';

console.log('App Initialized: 21K Inquebrantables');

// ─── SMOOTH SCROLL ─────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── META PIXEL EVENTS ─────────────────────────────────────────────────────────
// El Pixel base (PageView) ya se disparó en el <head> de index.html al cargar.
// Aquí manejamos ViewContent e InitiateCheckout de forma segura, sin duplicados.

(function initMetaPixelEvents() {

  // Esperamos a que fbq esté disponible (ya lo está porque el snippet está en <head>)
  if (typeof fbq !== 'function') {
    console.warn('[MetaPixel] fbq no encontrado. Verifica que el snippet del Pixel está en <head>.');
    return;
  }

  // ── ViewContent: se dispara UNA SOLA VEZ al cargar la landing ──────────────
  if (!window._viewContentFired) {
    window._viewContentFired = true;
    fbq('track', 'ViewContent', {
      content_name: '21K Inquebrantables',
      content_category: 'Plan de entrenamiento',
      currency: 'USD',
      value: 49.99,
    });
    console.log('[MetaPixel] ViewContent disparado.');
  }

  // ── InitiateCheckout: se dispara en clic de cualquier CTA hacia TrainingPeaks ─
  // Usamos IDs específicos para evitar colisiones con otros <a> del sitio.
  if (!window._initCheckoutBound) {
    window._initCheckoutBound = true;

    const ctaButtons = [
      document.getElementById('cta-hero'),   // "INICIA TU PLAN HOY"
      document.getElementById('cta-footer'),  // "ACCEDER AHORA"
    ];

    ctaButtons.forEach(function (btn) {
      if (!btn) return; // guard por si el DOM cambia en el futuro
      btn.addEventListener('click', function () {
        fbq('track', 'InitiateCheckout', {
          content_name: '21K Inquebrantables',
          content_category: 'Plan de entrenamiento',
          source: 'landing_21k',
        });
        console.log('[MetaPixel] InitiateCheckout disparado desde:', btn.id);
      });
    });

    console.log('[MetaPixel] Listeners de InitiateCheckout registrados en:', ctaButtons.filter(Boolean).map(b => b.id));
  }

})();
