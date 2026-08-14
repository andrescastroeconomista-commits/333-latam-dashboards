/* ================================================================
   PORK ECONOMICS — Control de acceso por token
   ================================================================
   Instrucciones:
   1. Agrega un token por contacto en el objeto TOKENS de abajo.
   2. El token puede ser cualquier texto sin espacios (ej: "PE-JUAN-01").
   3. Comparte el link así: tudominio.com/Inicio.dc.html?token=PE-JUAN-01
   4. Para revocar acceso: borra el token de aquí y republica.
   ================================================================ */

(function () {

  /* ── ACTIVAR / DESACTIVAR ────────────────────────────────────
     true  → protección activa (para cuando compartas el portal)
     false → sin protección   (para mientras construyes/pruebas)
  ─────────────────────────────────────────────────────────────── */
  var ENABLED = false;

  /* ── LISTA DE TOKENS ──────────────────────────────────────────
     'TOKEN' : 'Nombre del contacto'   ← solo para tu referencia
  ─────────────────────────────────────────────────────────────── */
  var TOKENS = {
    'PE-DEMO-2024'  : 'Acceso Demo',
    'PE-2024-A1'    : 'Contacto 1',
    'PE-2024-B2'    : 'Contacto 2',
    'PE-2024-C3'    : 'Contacto 3',
  };
  /* ─────────────────────────────────────────────────────────────*/

  var SESSION_KEY = 'pe_token';

  function getUrlToken() {
    try { return new URLSearchParams(window.location.search).get('token'); } catch (e) { return null; }
  }

  function getStoredToken() {
    try { return sessionStorage.getItem(SESSION_KEY); } catch (e) { return null; }
  }

  function isValid(token) {
    return !!(token && Object.prototype.hasOwnProperty.call(TOKENS, token));
  }

  function resolveToken() {
    var url = getUrlToken();
    if (isValid(url)) {
      try { sessionStorage.setItem(SESSION_KEY, url); } catch (e) {}
      return url;
    }
    var stored = getStoredToken();
    if (isValid(stored)) return stored;
    return null;
  }

  function getBase() {
    return document.baseURI.replace(/[^\/]*(\?.*)?$/, '');
  }

  function showDenied() {
    var base = getBase();
    document.body.style.cssText = [
      'margin:0', 'padding:0',
      "font-family:'Montserrat',sans-serif",
      'background:#f4f8fd',
      'display:flex', 'align-items:center', 'justify-content:center',
      'min-height:100vh',
    ].join(';');

    document.body.innerHTML = [
      '<div style="text-align:center;padding:52px 24px;max-width:460px;width:100%;">',
        '<img src="' + base + 'logo333.png" style="height:56px;display:block;margin:0 auto 18px;">',
        '<div style="font-size:36px;font-weight:700;color:#1F6DB1;letter-spacing:-1.5px;line-height:1;margin-bottom:16px;">Pork Economics</div>',
        '<div style="width:48px;height:3px;background:#E87722;border-radius:2px;margin:0 auto 40px;"></div>',
        '<div style="width:72px;height:72px;border-radius:50%;background:#1F6DB1;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">',
          '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
            '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>',
            '<path d="M7 11V7a5 5 0 0 1 10 0v4"></path>',
          '</svg>',
        '</div>',
        '<div style="font-size:20px;font-weight:700;color:#53565A;margin-bottom:10px;">Acceso restringido</div>',
        '<div style="font-size:14px;color:#53565A;line-height:1.8;margin-bottom:32px;">',
          'Este boletín es exclusivo para suscriptores.<br>',
          'Si recibiste un enlace de acceso, ábrelo<br>',
          'directamente desde tu correo.',
        '</div>',
        '<div style="background:white;border-radius:10px;padding:18px 24px;box-shadow:0 2px 14px rgba(31,109,177,.1);font-size:13px;color:#53565A;line-height:1.7;">',
          '¿No tienes acceso? Contáctanos a<br>',
          '<a href="mailto:ccastro@333corporate.com" style="color:#1F6DB1;font-weight:700;text-decoration:none;">ccastro@333corporate.com</a>',
        '</div>',
      '</div>',
    ].join('');
  }

  function appendToken(url) {
    var token = resolveToken();
    if (!token) return url;
    var sep = url.indexOf('?') >= 0 ? '&' : '?';
    return url + sep + 'token=' + encodeURIComponent(token);
  }

  window.PEAuth = {
    /* Llama esto en componentDidMount de cada página.
       Retorna true si el acceso es válido; false (y muestra pantalla de bloqueo) si no. */
    check: function () {
      if (!ENABLED) return true;
      var token = resolveToken();
      if (!token) { showDenied(); return false; }
      return true;
    },
    /* Agrega ?token=... a cualquier URL interna */
    appendToken: appendToken,
    /* Retorna el token activo */
    getToken: function () { return resolveToken(); },
  };

}());
