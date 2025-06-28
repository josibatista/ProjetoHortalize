const nomeInput = document.getElementById('nomeInput');
const emailInput = document.getElementById('emailInput');

function cadastrarUsuario(){
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();

    if(nome === "" || email === "") return alert("Preencha todos os campos!");

    const data = new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    const novoUsuario = {nome, email, data};

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    carregarUsuarios();
    limparCampos();
    exibirMensagem("Usuário cadastrado com sucesso!");
}

function adicionarNaLista(usuario, index) {
    const tbody = document.querySelector('#tabela-usuarios tbody');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.data}</td>
        <td><button class="botao-excluir" onclick="excluirUsuario(${index})">X</button></td>
    `;

    tbody.appendChild(tr);
}

function limparCampos(){
    nomeInput.value = '';
    emailInput.value = '';
}

function carregarUsuarios(filtro = '') {
    const tbody = document.querySelector('#tabela-usuarios tbody');
    tbody.innerHTML = '';
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    usuarios.forEach((usuario, index) => {
        const texto = `${usuario.nome} ${usuario.email} ${usuario.data}`.toLowerCase();
        if (texto.includes(filtro.toLowerCase())) {
            adicionarNaLista(usuario, index);
        }
    });
}

window.onload = carregarUsuarios;

function exibirMensagem(texto, corFundo = '#d4edda', corTexto = '#155724') {
    const msg = document.getElementById('mensagem-sucesso');
    msg.textContent = texto;
    msg.style.display = 'block';
    msg.style.backgroundColor = corFundo;
    msg.style.color = corTexto;
    msg.style.opacity = '1';

    setTimeout(() => {
        msg.style.display = 'none';
        msg.style.opacity = '0';
    }, 3000);
}

document.getElementById('campo-pesquisa').addEventListener('input', (e) => {
    const termo = e.target.value;
    carregarUsuarios(termo);
});

function excluirTodosUsuarios() {
    document.getElementById('popup-confirmacao').style.display = 'flex';
}

function fecharPopup() {
    document.getElementById('popup-confirmacao').style.display = 'none';
}

function confirmarExclusaoTodos() {
    localStorage.removeItem('usuarios');
    carregarUsuarios();
    fecharPopup();
    exibirMensagem("Todos os usuários foram excluídos!", "#f8d7da", "#721c24");
}


function excluirUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
    exibirMensagem("Usuário excluído com sucesso!", "#f8d7da", "#721c24"); 
}