/* =========================================================
   Encabezado, pie de página y comportamiento común del sitio
   ========================================================= */
(function () {
  var C = window.MV || {};
  var pagina = document.body.getAttribute('data-pagina') || 'inicio';

  var ICO = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.59 2 2.15 6.44 2.15 11.9c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.13-2.89-7.01Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.46-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46H16.6V4.46A21 21 0 0 0 14.3 4.3c-2.28 0-3.84 1.39-3.84 3.95v2.25H8v3h2.46V21h3.04Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    escudo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>'
  };
  window.MV_ICO = ICO;

  function waUrl(msg) {
    return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(msg || C.whatsappMensaje || '');
  }
  window.MV_WA = waUrl;

  function redes(clase) {
    var h = '';
    if (C.whatsapp) h += '<a href="' + waUrl() + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICO.wa + (clase === 'top' ? '<span>' + C.whatsappTexto + '</span>' : '') + '</a>';
    if (C.correo && clase === 'top') h += '<a href="mailto:' + C.correo + '">' + ICO.mail + '<span>' + C.correo + '</span></a>';
    if (C.facebook) h += '<a href="' + C.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICO.fb + '</a>';
    if (C.instagram) h += '<a href="' + C.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICO.ig + '</a>';
    return h;
  }

  var enlaces = [
    ['inicio', 'index.html', 'Inicio'],
    ['nosotros', 'index.html#nosotros', 'Nosotros'],
    ['servicios', 'index.html#servicios', 'Servicios'],
    ['formacion', 'index.html#formacion', 'Formación'],
    ['verificar', 'verificar.html', 'Verificar constancia']
  ];

  var enc = document.getElementById('encabezado');
  if (enc) {
    enc.innerHTML =
      '<div class="topbar"><div class="in">' +
        '<span class="lema">Capacitación · Consultoría · Auditoría en Sistemas de Gestión</span>' +
        '<div class="redes">' + redes('top') + '</div>' +
      '</div></div>' +
      '<header class="nav" id="nav"><div class="in">' +
        '<a class="marca" href="index.html" aria-label="Inicio"><img src="img/logo-mv.webp" alt="' + C.empresa + '" width="520" height="323"></a>' +
        '<button class="hamburguesa" id="hamb" aria-label="Abrir menú" aria-expanded="false">' + ICO.menu + '</button>' +
        '<ul class="menu" id="menu">' +
          enlaces.map(function (e) {
            return '<li><a href="' + e[1] + '"' + (e[0] === pagina ? ' class="activo"' : '') + '>' + e[2] + '</a></li>';
          }).join('') +
          '<li><a class="btn btn-oro" href="' + waUrl() + '" target="_blank" rel="noopener">' + ICO.wa + 'Diagnóstico gratis</a></li>' +
        '</ul>' +
      '</div></header>';

    var hamb = document.getElementById('hamb'), menu = document.getElementById('menu');
    hamb.addEventListener('click', function () {
      var abierto = menu.classList.toggle('abierto');
      hamb.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    menu.addEventListener('click', function (ev) { if (ev.target.closest('a')) menu.classList.remove('abierto'); });
    var nav = document.getElementById('nav');
    window.addEventListener('scroll', function () { nav.classList.toggle('sombra', window.scrollY > 10); }, { passive: true });
  }

  var pie = document.getElementById('pie');
  if (pie) {
    var anio = new Date().getFullYear();
    pie.innerHTML =
      '<footer><div class="in pie">' +
        '<div><img src="img/logo-mv-blanco.webp" alt="' + C.empresa + '" width="520" height="323">' +
          '<p>Consultoría, formación y auditoría en Sistemas de Gestión. Ganar-Ganar con su organización.</p>' +
          '<div class="redes">' + redes('pie') + '</div></div>' +
        '<div><h4>Navegación</h4><ul>' +
          enlaces.map(function (e) { return '<li><a href="' + e[1] + '">' + e[2] + '</a></li>'; }).join('') +
        '</ul></div>' +
        '<div><h4>Contacto</h4><ul>' +
          (C.whatsapp ? '<li><a href="' + waUrl() + '" target="_blank" rel="noopener">WhatsApp ' + C.whatsappTexto + '</a></li>' : '') +
          (C.correo ? '<li><a href="mailto:' + C.correo + '">' + C.correo + '</a></li>' : '') +
          '<li><a href="verificar.html">Verificar una constancia</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="legal"><div class="in"><span>© ' + anio + ' ' + C.empresa + '</span><span>Sitio seguro (HTTPS)</span></div></div></footer>' +
      (C.whatsapp ? '<a class="wa-flotante" href="' + waUrl() + '" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">' + ICO.wa + '</a>' : '');
  }

  // Enlaces de WhatsApp dentro del contenido
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waUrl(a.getAttribute('data-wa') || '');
    a.target = '_blank'; a.rel = 'noopener';
  });

  // Aparición suave al hacer scroll
  var obs = 'IntersectionObserver' in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visto'); obs.unobserve(en.target); } });
  }, { threshold: .12 }) : null;
  document.querySelectorAll('.revelar').forEach(function (el) { obs ? obs.observe(el) : el.classList.add('visto'); });
})();
