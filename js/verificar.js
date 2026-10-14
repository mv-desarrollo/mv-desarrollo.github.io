/* =========================================================
   Verificación de constancias M&V
   Consulta el registro (Apps Script) y dibuja la constancia
   ========================================================= */
(function () {
  var C = window.MV || {};
  var caja = document.getElementById('resultado');
  var form = document.getElementById('formBuscar');
  var input = document.getElementById('codigo');
  var btn = document.getElementById('btnBuscar');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  // Acepta el código con o sin guiones, o la URL completa pegada
  function limpiar(t) {
    var s = String(t || '').trim();
    var m = s.match(/[?&](?:c|cert|codigo)=([^&#\s]+)/i) || s.match(/\/exec\/([^?&#\s\/]+)/i);
    if (m) { try { s = decodeURIComponent(m[1]); } catch (e) {} }
    return s.replace(/\s+/g, '').slice(0, 120);
  }

  function urlPropia(codigo) {
    return location.origin + location.pathname + '?c=' + encodeURIComponent(codigo);
  }

  function estadoHtml(clase, ico, titulo, texto) {
    return '<div class="estado ' + clase + '"><div class="ico">' + ico + '</div><div><h2>' + titulo + '</h2><p>' + texto + '</p></div></div>';
  }

  function pintarCargando() {
    caja.innerHTML = '<div class="tarjeta">' + estadoHtml('cargando', '↻', 'Verificando…', 'Consultando el registro oficial de constancias de M&amp;V.') + '</div>';
  }

  function pintarError(estado, codigo) {
    var h;
    if (estado === 'formato_invalido') {
      h = estadoHtml('aviso', '?', 'Número de certificado no válido', 'El número no tiene el formato correcto. Revisa que lo hayas copiado completo; debe verse así: <code>MV-XXXX-XXXX-XXXX</code>');
    } else if (estado === 'no_encontrado') {
      h = estadoHtml('cancelada', '✕', 'No se encontró la constancia', 'No existe una constancia emitida por M&amp;V con el número <code>' + esc(codigo) + '</code>.');
    } else if (estado === 'no_verificable') {
      h = estadoHtml('cancelada', '!', 'No es posible verificar esta constancia', 'Los datos registrados no coinciden con los de emisión. Comunícate con M&amp;V para aclararlo.');
    } else if (estado === 'red') {
      h = estadoHtml('aviso', '!', 'No pudimos consultar el registro', 'Revisa tu conexión e inténtalo de nuevo en unos segundos.');
    } else {
      h = estadoHtml('aviso', '!', 'No pudimos mostrar el resultado', 'Ocurrió un error inesperado. Inténtalo de nuevo o comunícate con M&amp;V.');
    }
    caja.innerHTML = '<div class="tarjeta">' + h + '</div>';
  }

  function pintarCert(r) {
    var c = r.cert;
    var ESTADOS = {
      valida: ['valida', '✓', 'Constancia válida', 'Esta constancia fue emitida por M&amp;V y se encuentra vigente.'],
      cancelada: ['cancelada', '✕', 'Constancia cancelada', 'Esta constancia fue emitida por M&amp;V, pero fue cancelada y no tiene validez.'],
      sustituida: ['sustituida', '!', 'Constancia sustituida', 'Esta constancia fue reemplazada por una versión más reciente. Solicita al titular la constancia vigente.']
    };
    var e = ESTADOS[r.estado];
    if (!e || !c) { pintarError('desconocido', c && c.codigo); return; }
    var est = estadoHtml(e[0], e[1], e[2], e[3]);
    var url = urlPropia(c.codigo);
    var h = '<div class="tarjeta">' + est +
      '<div class="titular"><p class="etq">Otorgada a</p><p class="nombre">' + esc(c.nombre) + '</p>' +
      '<p class="etq">Por su participación en el curso</p><p class="curso">' + esc(c.curso) + '</p>' +
      (c.norma ? '<p class="norma-c">' + esc(c.norma) + '</p>' : '') + '</div>' +
      '<div class="datos">' +
        dato('Duración', c.duracion) + dato('Fecha(s) de impartición', c.fechas) + dato('Modalidad', c.modalidad) +
        dato('Lugar', c.lugar) + dato('Fecha de emisión', c.fecha) +
      '</div>' +
      '<div class="pie-cert"><div>Número de certificado: <code>' + esc(c.codigo) + '</code></div>' +
      '<div>URL del certificado: <code>' + esc(url) + '</code></div>' +
      '<div>Número de referencia: <code>' + esc(c.ref) + '</code></div></div></div>';
    if (r.estado === 'valida') {
      h += '<section class="cert"><div class="cert-cab"><h3>Constancia de participación</h3>' +
        '<button type="button" class="btn btn-oro" id="btnPdf" disabled>Preparando…</button></div>' +
        '<canvas id="lienzo" width="2854" height="2204" role="img" aria-label="Constancia de ' + esc(c.nombre) + '"></canvas>' +
        '<p class="ayuda" id="certMsg" style="color:var(--gris)"></p></section>';
    }
    caja.innerHTML = h;
    if (r.estado === 'valida') dibujarConstancia(Object.assign({}, c, { url: url }));
  }

  function dato(etq, val) {
    return '<div class="dato"><p class="etq">' + etq + '</p><b>' + esc(val || '—') + '</b></div>';
  }

  // JSONP: funciona aunque el navegador bloquee peticiones entre dominios
  function consultar(codigo) {
    return new Promise(function (ok, mal) {
      var cb = 'mvCb' + Date.now() + Math.floor(Math.random() * 1000);
      var s = document.createElement('script');
      var t = setTimeout(function () { limpiarCb(); mal(new Error('tiempo')); }, 20000);
      // Si la respuesta llega después del tiempo límite, la función queda vacía para no generar errores
      function limpiarCb() { clearTimeout(t); window[cb] = function () {}; s.remove(); }
      window[cb] = function (datos) { limpiarCb(); ok(datos); };
      s.onerror = function () { limpiarCb(); mal(new Error('red')); };
      s.src = C.apiVerificacion + '?formato=json&callback=' + cb + '&cert=' + encodeURIComponent(codigo);
      document.body.appendChild(s);
    });
  }

  function verificar(entrada, actualizarUrl) {
    var codigo = limpiar(entrada);
    if (!codigo) return;
    input.value = codigo;
    btn.disabled = true;
    pintarCargando();
    consultar(codigo).then(function (r) {
      // Errores al pintar se distinguen de errores de red
      try {
        if (actualizarUrl && r && r.codigo) history.replaceState(null, '', '?c=' + encodeURIComponent(r.codigo));
        if (r && r.cert) pintarCert(r); else pintarError(r && r.estado, r && r.codigo || codigo);
      } catch (e) { pintarError('desconocido', codigo); }
    }, function () { pintarError('red', codigo); })
      .then(function () { btn.disabled = false; caja.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  }

  form.addEventListener('submit', function (ev) { ev.preventDefault(); verificar(input.value, true); });

  var q = new URLSearchParams(location.search);
  var inicial = q.get('c') || q.get('cert') || q.get('codigo');
  if (inicial) verificar(inicial, false);

  /* ---------------- Constancia (lienzo + PDF) ---------------- */
  var fondo = new Image();
  fondo.src = 'img/fondo-constancia.webp';

  function dibujarConstancia(c) {
    var W = 1427, H = 1102, S = 2;
    var NAVY = '#04193F', AZUL = '#30458B';
    var QR = { x: 978, y: 852, t: 120 };
    var cv = document.getElementById('lienzo'), ctx = cv.getContext('2d');
    var bPdf = document.getElementById('btnPdf'), msg = document.getElementById('certMsg');

    function texto(t, x, y, fuente, tam, color, alinear, anchoMax, minimo) {
      if (!t) return;
      var s = tam;
      ctx.font = fuente.replace('{s}', s * S);
      if (anchoMax) {
        while (ctx.measureText(t).width > anchoMax * S && s > (minimo || 10)) { s -= 1; ctx.font = fuente.replace('{s}', s * S); }
      }
      ctx.fillStyle = color; ctx.textAlign = alinear || 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillText(t, x * S, y * S);
    }

    function pintar() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.drawImage(fondo, 0, 0, W * S, H * S);
      texto(c.nombre, 713, 562, '{s}px "Great Vibes", cursive', 96, NAVY, 'center', 900, 54);
      texto(String(c.curso || '').toUpperCase(), 703, 696, '700 {s}px Tinos, "Times New Roman", serif', 50, NAVY, 'center', 1040, 26);
      texto(c.norma, 703, 733, '700 {s}px Tinos, "Times New Roman", serif', 29, NAVY, 'center', 1060, 16);
      texto(c.duracion, 293, 791, '400 {s}px Lato, Arial, sans-serif', 22, AZUL, 'left', 520, 14);
      texto(c.fechas, 417, 834, '400 {s}px Lato, Arial, sans-serif', 22, AZUL, 'left', 400, 13);
      texto(c.modalidad, 305, 882, '400 {s}px Lato, Arial, sans-serif', 22, AZUL, 'left', 500, 14);
      texto(c.folio, 264, 933, '400 {s}px Lato, Arial, sans-serif', 22, AZUL, 'left', 500, 14);
      ctx.fillStyle = '#FFFFFF'; ctx.strokeStyle = '#B8913A'; ctx.lineWidth = 2 * S;
      ctx.beginPath(); ctx.rect((QR.x - 6) * S, (QR.y - 6) * S, (QR.t + 12) * S, (QR.t + 12) * S); ctx.fill(); ctx.stroke();
      if (window.QRious) {
        var qr = new QRious({ value: c.url, size: QR.t * S, level: 'M', foreground: NAVY, background: '#FFFFFF' });
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(qr.canvas, QR.x * S, QR.y * S, QR.t * S, QR.t * S);
        ctx.imageSmoothingEnabled = true;
      }
      texto('Certificado: ' + c.codigo, 1038, QR.y + QR.t + 22, '700 {s}px Lato, Arial, sans-serif', 10.5, NAVY, 'center', 290, 8);
      texto('Referencia: ' + c.ref, 1038, QR.y + QR.t + 36, '700 {s}px Lato, Arial, sans-serif', 10.5, NAVY, 'center', 290, 8);
    }

    function nombreArchivo() {
      var n = String(c.nombre || 'Constancia').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z0-9]+/g, '_').replace(/^_|_$/g, '');
      return 'Constancia_MV_' + n + '_' + c.ref + '.pdf';
    }

    function pdf() {
      try {
        var doc = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'pt', format: 'letter', compress: true });
        var pw = doc.internal.pageSize.getWidth(), ph = doc.internal.pageSize.getHeight();
        doc.setProperties({ title: 'Constancia ' + c.codigo, subject: c.curso, author: 'M&V Desarrollo y Productividad Empresarial' });
        doc.addImage(cv.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pw, ph);
        doc.link(QR.x / W * pw, QR.y / H * ph, QR.t / W * pw, QR.t / H * ph, { url: c.url });
        doc.save(nombreArchivo());
      } catch (e) { msg.textContent = 'No se pudo generar el PDF (' + e.message + ').'; }
    }

    var esperaFondo = fondo.complete && fondo.naturalWidth ? Promise.resolve() :
      new Promise(function (ok) { fondo.onload = ok; fondo.onerror = ok; });
    var fuentes = ['96px "Great Vibes"', '700 50px Tinos', '400 22px Lato', '700 11px Lato'];
    var esperaLibs = new Promise(function (ok) {
      var n = 0; (function rev() { if ((window.QRious && window.jspdf) || n++ > 50) ok(); else setTimeout(rev, 100); })();
    });
    Promise.all([esperaFondo, esperaLibs].concat(fuentes.map(function (f) { return document.fonts ? document.fonts.load(f) : null; })))
      .catch(function () {}).then(function () {
        pintar();
        if (window.jspdf && window.jspdf.jsPDF) {
          bPdf.disabled = false; bPdf.textContent = 'Descargar PDF'; bPdf.addEventListener('click', pdf);
        } else { bPdf.textContent = 'PDF no disponible'; }
      });
  }
})();
