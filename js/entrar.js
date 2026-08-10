import { montarTopo, montarRodape, esc } from './comum.js';
import { cadastrar, login } from './auth.js';

montarTopo('');
montarRodape();

const el = document.getElementById('conteudo');
let modo = 'login'; // 'login' | 'cadastro'

function render() {
  const cad = modo === 'cadastro';
  el.innerHTML = `
    <div class="conta-card">
      <div class="conta-tabs">
        <button class="conta-tab ${!cad ? 'ativo' : ''}" data-tab="login">Entrar</button>
        <button class="conta-tab ${cad ? 'ativo' : ''}" data-tab="cadastro">Criar conta</button>
      </div>
      <form id="form">
        ${cad ? `
          <div class="campo"><label>Nome completo</label>
            <input id="f_nome" class="input-conta" autocomplete="name" required /></div>
          <div class="campo"><label>Telefone / WhatsApp</label>
            <input id="f_tel" class="input-conta" inputmode="tel" placeholder="(19) 99999-9999" /></div>` : ''}
        <div class="campo"><label>E-mail</label>
          <input id="f_email" class="input-conta" type="email" autocomplete="email" required /></div>
        <div class="campo"><label>Senha</label>
          <input id="f_senha" class="input-conta" type="password"
                 autocomplete="${cad ? 'new-password' : 'current-password'}"
                 placeholder="${cad ? 'mín. 6 caracteres' : ''}" required /></div>
        <p class="conta-msg" id="msg"></p>
        <button class="btn-marca bloco-conta" id="btn" type="submit">${cad ? 'Criar conta' : 'Entrar'}</button>
      </form>
      ${cad ? `<p class="conta-obs">Após o cadastro, sua conta passa por uma <strong>análise</strong>.
                 Você terá acesso à área do cliente assim que for aprovada.</p>` : ''}
    </div>`;

  el.querySelectorAll('.conta-tab').forEach((b) => b.onclick = () => { modo = b.dataset.tab; render(); });
  document.getElementById('form').onsubmit = enviar;
}

async function enviar(e) {
  e.preventDefault();
  const cad = modo === 'cadastro';
  const msg = document.getElementById('msg');
  const btn = document.getElementById('btn');
  msg.className = 'conta-msg';
  msg.textContent = '';
  btn.disabled = true;
  btn.textContent = cad ? 'Criando...' : 'Entrando...';

  const email = document.getElementById('f_email').value.trim();
  const senha = document.getElementById('f_senha').value;

  try {
    if (cad) {
      const nome = document.getElementById('f_nome').value.trim();
      const telefone = document.getElementById('f_tel').value.trim();
      if (senha.length < 6) throw new Error('A senha precisa de ao menos 6 caracteres.');
      const { data, error } = await cadastrar({ nome, telefone, email, senha });
      if (error) throw error;
      if (data.session) {
        // conta criada e já autenticada (pendente de aprovação) → área mostra o status
        location.href = 'area.html';
      } else {
        ok(msg, 'Cadastro recebido! Confirme seu e-mail pelo link que enviamos e depois é só entrar.');
        btn.disabled = false; btn.textContent = 'Criar conta';
      }
    } else {
      const { error } = await login(email, senha);
      if (error) throw error;
      location.href = 'area.html';
    }
  } catch (err) {
    erro(msg, traduz(err.message));
    btn.disabled = false;
    btn.textContent = cad ? 'Criar conta' : 'Entrar';
  }
}

const ok = (m, t) => { m.className = 'conta-msg ok'; m.textContent = t; };
const erro = (m, t) => { m.className = 'conta-msg erro'; m.textContent = t; };

// Mensagens do Supabase vêm em inglês; traduz as mais comuns.
function traduz(m) {
  const s = (m || '').toLowerCase();
  if (s.includes('invalid login')) return 'E-mail ou senha incorretos.';
  if (s.includes('already registered') || s.includes('already been registered')) return 'Já existe uma conta com esse e-mail.';
  if (s.includes('password should be')) return 'A senha precisa de ao menos 6 caracteres.';
  if (s.includes('email not confirmed')) return 'Confirme seu e-mail antes de entrar (veja o link que enviamos).';
  if (s.includes('unable to validate email')) return 'E-mail inválido.';
  return m || 'Não foi possível concluir. Tente de novo.';
}

render();
