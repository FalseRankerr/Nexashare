// =====================================================
// PATCH DE LOGIN ADMIN — inclua este script no login.html
// ANTES do </body>
// =====================================================
(function () {
  var ADMIN_EMAIL    = 'admin@nexashare.com';
  var ADMIN_PASSWORD = 'Admin@123';

  function readJSON(k, fb) {
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; }
  }
  function writeJSON(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
  }

  // Intercepta o submit do formulário de login
  // Funciona com qualquer form que tenha inputs de email e senha
  document.addEventListener('submit', function (e) {
    var form   = e.target;
    var emailInput = form.querySelector('input[type="email"], input[name="email"], #email, #usuario');
    var passInput  = form.querySelector('input[type="password"], input[name="senha"], #senha, #password');
    if (!emailInput || !passInput) return;

    var email = emailInput.value.trim().toLowerCase();
    var pass  = passInput.value;

    if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
      e.preventDefault();
      e.stopImmediatePropagation();

      writeJSON('nexa_logged_in', {
        username: 'Admin',
        name: 'Administrador',
        email: ADMIN_EMAIL,
        role: 'admin'
      });

      // Garante que a conta admin existe na lista de usuários
      var users = readJSON('nexa_users', []);
      if (!users.some(function(u){ return u.email === ADMIN_EMAIL; })) {
        users.unshift({
          name: 'Administrador', username: 'Admin',
          email: ADMIN_EMAIL, role: 'admin', status: 'online'
        });
        writeJSON('nexa_users', users);
      }

      window.location.href = '../admin.html';
    }
  }, true);
})();
