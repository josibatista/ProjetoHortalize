const nomeInput = document.getElementById('nomeInput');
const emailInput = document.getElementById('emailInput');
const listaUsuarios = document.getElementById('lista-usuarios');

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

    adicionarNaLista(novoUsuario);
    limparCampos();
    exibirMensagemSucesso();
}

function adicionarNaLista(usuario) {
    const tbody = document.querySelector('#tabela-usuarios tbody');
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.data}</td>
    `;

    tbody.appendChild(tr);
}

function limparCampos(){
    nomeInput.value = '';
    emailInput.value = '';
}

function carregarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.forEach(usuario => adicionarNaLista(usuario));
}

window.onload = carregarUsuarios;

function exibirMensagemSucesso() {
    const msg = document.getElementById('mensagem-sucesso');
    msg.style.display = 'block';
    msg.style.opacity = '1';

    setTimeout(() => {
        msg.style.display = 'none';
        msg.style.opacity = '0';
    }, 4000); // 4 segundos no total
}
