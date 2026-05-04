// URLs da API
const API_CULTURAS = '/api/culturas';
const API_PLANTACOES = '/api/plantacoes';

// Variáveis globais
let culturas = [];
let plantacoes = [];

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarCulturas();
    carregarPlantacoes();
    configurarAbas();
    configurarFormularios();
});

// ========== ABAS ==========
function configurarAbas() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            mudarAba(tabName);
        });
    });
}

function mudarAba(tabName) {
    // Remover classes active
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    // Adicionar classes active
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// ========== MENSAGENS ==========
function exibirMensagem(texto, tipo = 'sucesso') {
    const div = document.getElementById('mensagem');
    div.textContent = texto;
    div.className = `mensagem ativa ${tipo}`;
    
    setTimeout(() => {
        div.classList.remove('ativa');
    }, 3000);
}

// ========== CULTURAS ==========
async function carregarCulturas() {
    try {
        const resposta = await fetch(API_CULTURAS);
        if (!resposta.ok) throw new Error('Erro ao carregar culturas');
        
        culturas = await resposta.json();
        renderizarCulturas();
        atualizarSelectCulturas();
    } catch (erro) {
        console.error(erro);
        exibirMensagem('Erro ao carregar culturas', 'erro');
    }
}

function renderizarCulturas() {
    const lista = document.getElementById('listaCulturas');
    lista.innerHTML = '';
    
    if (culturas.length === 0) {
        lista.innerHTML = '<p style="grid-column: 1/-1">Nenhuma cultura registrada</p>';
        return;
    }
    
    culturas.forEach(cultura => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <h3>${cultura.nome}</h3>
            <p><strong>Descrição:</strong> ${cultura.descricao}</p>
            <p><strong>Ciclo:</strong> ${cultura.cicloEmDias} dias</p>
            <p><strong>Rendimento:</strong> ${cultura.rendimentoPorHectare} ton/ha</p>
            <div class="item-acoes">
                <button class="btn-pequeno btn-remover" onclick="removerCultura(${cultura.id})">Remover</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

function atualizarSelectCulturas() {
    const select = document.getElementById('plantacao_cultura');
    const opcaoAtual = select.value;
    
    select.innerHTML = '<option value="">Selecione uma cultura</option>';
    culturas.forEach(cultura => {
        const option = document.createElement('option');
        option.value = cultura.id;
        option.textContent = cultura.nome;
        select.appendChild(option);
    });
    
    select.value = opcaoAtual;
}

async function adicionarCultura(evento) {
    evento.preventDefault();
    
    const dados = {
        nome: document.getElementById('cultura_nome').value,
        descricao: document.getElementById('cultura_descricao').value,
        cicloEmDias: parseInt(document.getElementById('cultura_ciclo').value),
        rendimentoPorHectare: parseFloat(document.getElementById('cultura_rendimento').value)
    };
    
    try {
        const resposta = await fetch(API_CULTURAS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        
        if (resposta.status === 201) {
            document.getElementById('formularioCultura').reset();
            exibirMensagem('Cultura adicionada com sucesso!', 'sucesso');
            carregarCulturas();
        } else if (resposta.status === 400) {
            exibirMensagem('Preencha todos os campos corretamente', 'erro');
        }
    } catch (erro) {
        console.error(erro);
        exibirMensagem('Erro ao adicionar cultura', 'erro');
    }
}

async function removerCultura(id) {
    if (!confirm('Tem certeza que deseja remover esta cultura?')) return;
    
    try {
        const resposta = await fetch(`${API_CULTURAS}/${id}`, {
            method: 'DELETE'
        });
        
        if (resposta.ok) {
            exibirMensagem('Cultura removida com sucesso!', 'sucesso');
            carregarCulturas();
        } else if (resposta.status === 404) {
            exibirMensagem('Cultura não encontrada', 'erro');
        }
    } catch (erro) {
        console.error(erro);
        exibirMensagem('Erro ao remover cultura', 'erro');
    }
}

// ========== PLANTAÇÕES ==========
async function carregarPlantacoes() {
    try {
        const resposta = await fetch(API_PLANTACOES);
        if (!resposta.ok) throw new Error('Erro ao carregar plantações');
        
        plantacoes = await resposta.json();
        renderizarPlantacoes();
    } catch (erro) {
        console.error(erro);
        exibirMensagem('Erro ao carregar plantações', 'erro');
    }
}

function renderizarPlantacoes() {
    const lista = document.getElementById('listaPlantacoes');
    lista.innerHTML = '';
    
    if (plantacoes.length === 0) {
        lista.innerHTML = '<p style="grid-column: 1/-1">Nenhuma plantação registrada</p>';
        return;
    }
    
    plantacoes.forEach(plantacao => {
        const cultura = culturas.find(c => c.id === plantacao.culturaId);
        const nomeCultura = cultura ? cultura.nome : 'Desconhecida';
        
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <h3>${nomeCultura}</h3>
            <p><strong>Data de Semeadura:</strong> ${new Date(plantacao.dataSemeadura).toLocaleDateString('pt-BR')}</p>
            <p><strong>Área:</strong> ${plantacao.areaEmHectares} hectares</p>
            <p><strong>Status:</strong> <span style="background: var(--cor-secundaria); color: white; padding: 2px 8px; border-radius: 3px;">${plantacao.status}</span></p>
            <div class="item-acoes">
                <button class="btn-pequeno btn-remover" onclick="removerPlantacao(${plantacao.id})">Remover</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

async function adicionarPlantacao(evento) {
    evento.preventDefault();
    
    const dados = {
        culturaId: parseInt(document.getElementById('plantacao_cultura').value),
        dataSemeadura: document.getElementById('plantacao_data').value,
        areaEmHectares: parseFloat(document.getElementById('plantacao_area').value),
        status: document.getElementById('plantacao_status').value
    };
    
    try {
        const resposta = await fetch(API_PLANTACOES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        
        if (resposta.status === 201) {
            document.getElementById('formularioPlantacao').reset();
            exibirMensagem('Plantação registrada com sucesso!', 'sucesso');
            carregarPlantacoes();
        } else if (resposta.status === 400) {
            exibirMensagem('Preencha todos os campos corretamente', 'erro');
        }
    } catch (erro) {
        console.error(erro);
        exibirMensagem('Erro ao registrar plantação', 'erro');
    }
}

async function removerPlantacao(id) {
    if (!confirm('Tem certeza que deseja remover esta plantação?')) return;
    
    try {
        const resposta = await fetch(`${API_PLANTACOES}/${id}`, {
            method: 'DELETE'
        });
        
        if (resposta.ok) {
            exibirMensagem('Plantação removida com sucesso!', 'sucesso');
            carregarPlantacoes();
        } else if (resposta.status === 404) {
            exibirMensagem('Plantação não encontrada', 'erro');
        }
    } catch (erro) {
        console.error(erro);
        exibirMensagem('Erro ao remover plantação', 'erro');
    }
}

// ========== CONFIGURAR FORMULÁRIOS ==========
function configurarFormularios() {
    document.getElementById('formularioCultura').addEventListener('submit', adicionarCultura);
    document.getElementById('formularioPlantacao').addEventListener('submit', adicionarPlantacao);
}
