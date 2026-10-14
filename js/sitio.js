/* =========================================================
   Encabezado, pie de página y comportamiento común del sitio
   ========================================================= */
(function () {
  var C = window.MV || {};
  var body = document.body;
  var pagina = body.getAttribute('data-pagina') || 'inicio';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  var ICO = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.59 2 2.15 6.44 2.15 11.9c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.13-2.89-7.01Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.46-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46H16.6V4.46A21 21 0 0 0 14.3 4.3c-2.28 0-3.84 1.39-3.84 3.95v2.25H8v3h2.46V21h3.04Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    li: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 13.4c0-3.1-1.66-4.54-3.87-4.54-1.78 0-2.58.98-3.02 1.67V8.5h-3.38c.04.95 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.69.13-.93.27-.69.89-1.4 1.94-1.4 1.37 0 1.92 1.05 1.92 2.58V20h3.38v-6.6Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
  };
  window.MV_ICO = ICO;

  function waUrl(msg) {
    return 'https://wa.me/' + C.whatsapp + '?text=' + encodeURIComponent(msg || C.whatsappMensaje || '');
  }
  window.MV_WA = waUrl;

  function redes(lugar) {
    var h = '';
    if (C.whatsapp) h += '<a href="' + waUrl() + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICO.wa + (lugar === 'top' ? '<span>' + esc(C.whatsappTexto) + '</span>' : '') + '</a>';
    if (C.correo && lugar === 'top') h += '<a href="mailto:' + esc(C.correo) + '" class="solo-ancho">' + ICO.mail + '<span>' + esc(C.correo) + '</span></a>';
    if (C.facebook) h += '<a href="' + esc(C.facebook) + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICO.fb + '</a>';
    if (C.instagram) h += '<a href="' + esc(C.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICO.ig + '</a>';
    if (C.linkedin) h += '<a href="' + esc(C.linkedin) + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + ICO.li + '</a>';
    return h;
  }

  var enlaces = [
    ['nosotros', 'index.html#nosotros', 'Nosotros'],
    ['servicios', 'index.html#servicios', 'Servicios'],
    ['metodologia', 'metodologia.html', 'Metodología'],
    ['normas', 'normas.html', 'Normas'],
    ['formacion', 'formacion.html', 'Formación'],
    ['verificar', 'verificar.html', 'Verificar constancia']
  ];

  /* ---------- Encabezado ---------- */
  var enc = document.getElementById('encabezado');
  if (enc) {
    enc.innerHTML =
      '<a class="saltar" href="#contenido">Saltar al contenido</a>' +
      '<div class="topbar"><div class="in">' +
        '<span class="lema">Consultoría · Auditoría · Capacitación en Sistemas de Gestión</span>' +
        '<div class="redes">' + redes('top') + '</div>' +
      '</div></div>' +
      '<header class="nav" id="nav"><div class="in">' +
        '<a class="marca" href="index.html" aria-label="' + esc(C.empresa) + ' — Inicio">' +
          '<img class="m-color" src="img/marca-mv.webp" alt="" width="249" height="160">' +
          '<img class="m-blanca" src="img/marca-mv-blanco.webp" alt="" width="249" height="160">' +
          '<span class="marca-txt">Desarrollo y<br>Productividad Empresarial</span>' +
        '</a>' +
        '<button class="hamburguesa" id="hamb" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu">' + ICO.menu + '</button>' +
        '<nav aria-label="Principal"><ul class="menu" id="menu">' +
          enlaces.map(function (e) {
            return '<li><a href="' + e[1] + '"' + (e[0] === pagina ? ' class="activo" aria-current="page"' : '') + '>' + e[2] + '</a></li>';
          }).join('') +
          '<li><a class="btn btn-oro" href="index.html#contacto">Diagnóstico gratis</a></li>' +
        '</ul></nav>' +
      '</div></header>';

    var hamb = document.getElementById('hamb'), menu = document.getElementById('menu');
    hamb.addEventListener('click', function () {
      var abierto = menu.classList.toggle('abierto');
      enc.classList.toggle('menu-abierto', abierto);
      hamb.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      hamb.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
    menu.addEventListener('click', function (ev) {
      if (ev.target.closest('a')) { menu.classList.remove('abierto'); enc.classList.remove('menu-abierto'); hamb.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && menu.classList.contains('abierto')) { menu.classList.remove('abierto'); enc.classList.remove('menu-abierto'); hamb.setAttribute('aria-expanded', 'false'); hamb.focus(); }
    });

    var alScroll = function () { enc.classList.toggle('desplazado', window.scrollY > 24); };
    window.addEventListener('scroll', alScroll, { passive: true });
    alScroll();
  }

  /* ---------- Pie ---------- */
  var pie = document.getElementById('pie');
  if (pie) {
    var anio = new Date().getFullYear();
    pie.innerHTML =
      '<footer class="pie-sitio"><div class="in pie">' +
        '<div class="pie-marca"><img src="img/logo-mv-blanco.webp" alt="' + esc(C.empresa) + '" width="520" height="383" loading="lazy">' +
          '<p>Consultoría, auditoría y capacitación en Sistemas de Gestión. Una relación Ganar-Ganar con su organización.</p>' +
          '<div class="redes">' + redes('pie') + '</div></div>' +
        '<div><h4>Sitio</h4><ul>' +
          '<li><a href="index.html">Inicio</a></li>' +
          enlaces.map(function (e) { return '<li><a href="' + e[1] + '">' + e[2] + '</a></li>'; }).join('') +
        '</ul></div>' +
        '<div><h4>Contacto</h4><ul class="pie-contacto">' +
          (C.whatsapp ? '<li>' + ICO.wa + '<a href="' + waUrl() + '" target="_blank" rel="noopener">' + esc(C.whatsappTexto) + '</a></li>' : '') +
          (C.correo ? '<li>' + ICO.mail + '<a href="mailto:' + esc(C.correo) + '">' + esc(C.correo) + '</a></li>' : '') +
          (C.ubicacion ? '<li>' + ICO.pin + '<span>' + esc(C.ubicacion) + '</span></li>' : '') +
        '</ul>' +
        '<a class="btn btn-oro btn-sm" href="index.html#contacto">Solicitar diagnóstico</a></div>' +
      '</div>' +
      '<div class="legal"><div class="in"><span>© ' + anio + ' ' + esc(C.empresa) + '</span>' +
        '<span><a href="aviso-privacidad.html">Aviso de privacidad</a></span></div></div></footer>' +
      (C.whatsapp ? '<a class="wa-flotante" href="' + waUrl() + '" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">' + ICO.wa + '</a>' : '');
  }

  /* ---------- Enlaces de WhatsApp dentro del contenido ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.href = waUrl(a.getAttribute('data-wa') || '');
    a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------- Aparición suave al hacer scroll ---------- */
  var obs = 'IntersectionObserver' in window ? new IntersectionObserver(function (ents) {
    ents.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visto'); obs.unobserve(en.target); } });
  }, { threshold: .12 }) : null;
  document.querySelectorAll('.revelar').forEach(function (el) { obs ? obs.observe(el) : el.classList.add('visto'); });

  /* ---------- Videos: se reproducen solo cuando están en pantalla ---------- */
  var menosMov = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var videos = Array.prototype.slice.call(document.querySelectorAll('video[data-auto]'));

  function cargar(v) {
    if (v.dataset.cargado) return;
    v.dataset.cargado = '1';
    var diferidas = v.querySelectorAll('source[data-src]');
    if (!diferidas.length) return; // el video ya trae su src (portada)
    diferidas.forEach(function (s) { s.src = s.getAttribute('data-src'); });
    v.load();
  }
  function reproducir(v) {
    if (menosMov || v.dataset.pausado) return;
    cargar(v);
    var p = v.play(); if (p && p.catch) p.catch(function () {});
  }
  videos.forEach(function (v) {
    v.muted = true; v.setAttribute('muted', ''); v.playsInline = true;
  });
  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) reproducir(en.target); else if (!en.target.paused) en.target.pause(); });
    }, { rootMargin: '120px 0px', threshold: .01 });
    videos.forEach(function (v) { vo.observe(v); });
  } else {
    videos.forEach(reproducir);
  }

  // Botón para pausar el video de portada (accesibilidad: contenido en movimiento)
  document.querySelectorAll('[data-pausa]').forEach(function (b) {
    var v = document.getElementById(b.getAttribute('data-pausa'));
    if (!v) return;
    function pintar() {
      var pausado = !!v.dataset.pausado || menosMov;
      b.setAttribute('aria-pressed', pausado ? 'true' : 'false');
      b.setAttribute('aria-label', pausado ? 'Reproducir video de fondo' : 'Pausar video de fondo');
      b.innerHTML = pausado
        ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
    }
    b.addEventListener('click', function () {
      if (v.dataset.pausado || menosMov) { delete v.dataset.pausado; menosMov = false; reproducir(v); }
      else { v.dataset.pausado = '1'; v.pause(); }
      pintar();
    });
    pintar();
  });

  /* ---------- Filtros por categoría (normas / cursos) ---------- */
  document.querySelectorAll('[data-filtros]').forEach(function (barra) {
    var destino = document.getElementById(barra.getAttribute('data-filtros'));
    if (!destino) return;
    barra.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-cat]');
      if (!b) return;
      var cat = b.getAttribute('data-cat');
      barra.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      destino.querySelectorAll('[data-cat]').forEach(function (el) {
        el.hidden = !(cat === 'todas' || (' ' + el.getAttribute('data-cat') + ' ').indexOf(' ' + cat + ' ') > -1);
      });
    });
  });

  /* ---------- Formulario de contacto (WhatsApp / correo) ---------- */
  var form = document.getElementById('formContacto');
  if (form) {
    var aviso = document.getElementById('formAviso');
    function armar() {
      var d = new FormData(form);
      var lineas = [
        'Hola, solicito información / diagnóstico gratuito de M&V.',
        '',
        'Empresa: ' + (d.get('empresa') || ''),
        'Nombre: ' + (d.get('nombre') || ''),
        'Correo: ' + (d.get('correo') || ''),
        'Teléfono: ' + (d.get('telefono') || ''),
        'Servicio: ' + (d.get('servicio') || ''),
        'Norma de interés: ' + (d.get('norma') || '')
      ];
      if (d.get('mensaje')) lineas.push('', 'Mensaje: ' + d.get('mensaje'));
      return lineas.join('\n');
    }
    function valido() {
      if (!form.checkValidity()) { form.reportValidity(); return false; }
      return true;
    }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!valido()) return;
      window.open(waUrl(armar()), '_blank', 'noopener');
      if (aviso) aviso.textContent = 'Abrimos WhatsApp con su solicitud lista para enviar. Si no se abrió, use el botón “Enviar por correo”.';
    });
    var bCorreo = document.getElementById('btnCorreo');
    if (bCorreo) bCorreo.addEventListener('click', function () {
      if (!valido()) return;
      var asunto = 'Solicitud de información — ' + (new FormData(form).get('empresa') || 'Diagnóstico gratuito');
      location.href = 'mailto:' + C.correo + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(armar());
    });
    // Preseleccionar norma o servicio desde la URL: index.html?norma=ISO%209001#contacto
    var q = new URLSearchParams(location.search);
    ['norma', 'servicio'].forEach(function (k) {
      var v = q.get(k), sel = form.elements[k];
      if (v && sel) Array.prototype.forEach.call(sel.options, function (o) { if (o.value === v) sel.value = v; });
    });
  }

  /* ---------- Ampliar imágenes (infografía) ---------- */
  document.querySelectorAll('img[data-ampliar]').forEach(function (img) {
    img.setAttribute('tabindex', '0'); img.setAttribute('role', 'button');
    function abrir() {
      var v = document.createElement('div');
      v.className = 'visor'; v.setAttribute('role', 'dialog'); v.setAttribute('aria-label', img.alt); v.tabIndex = -1;
      v.innerHTML = '<img src="' + img.currentSrc + '" alt="' + esc(img.alt) + '">';
      function cerrar() { v.remove(); document.removeEventListener('keydown', tecla); img.focus(); }
      function tecla(ev) { if (ev.key === 'Escape') cerrar(); }
      v.addEventListener('click', cerrar); document.addEventListener('keydown', tecla);
      document.body.appendChild(v); v.focus();
    }
    img.addEventListener('click', abrir);
    img.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); abrir(); } });
  });

  /* ---------- Catálogo de cursos: búsqueda ---------- */
  var buscador = document.getElementById('buscarCurso');
  if (buscador) {
    var quitarAcentos = function (s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
    buscador.addEventListener('input', function () {
      var palabras = quitarAcentos(buscador.value.trim()).split(/\s+/).filter(Boolean);
      var visibles = 0;
      document.querySelectorAll('#catalogo li').forEach(function (li) {
        var txt = quitarAcentos(li.textContent + ' ' + li.closest('.grupo-cursos').querySelector('h3').textContent);
        var ok = palabras.every(function (p) { return txt.indexOf(p) > -1; });
        li.hidden = !ok; if (ok) visibles++;
      });
      document.querySelectorAll('#catalogo .grupo-cursos').forEach(function (g) {
        g.hidden = !g.querySelector('li:not([hidden])');
      });
      var n = document.getElementById('sinCursos'); if (n) n.hidden = visibles > 0;
    });
  }
})();
