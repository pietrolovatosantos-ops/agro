const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/culturas.json');

// Funções auxiliares
function lerCulturas() {
  try {
    const dados = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(dados);
  } catch (erro) {
    return [];
  }
}

function salvarCulturas(culturas) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(culturas, null, 2));
}

function gerarId(culturas) {
  return culturas.length > 0 ? Math.max(...culturas.map(c => c.id)) + 1 : 1;
}

// ROTAS

// GET - listar todas as culturas
router.get('/', (req, res) => {
  try {
    const culturas = lerCulturas();
    res.json(culturas);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar culturas' });
  }
});

// GET - buscar cultura por ID
router.get('/:id', (req, res) => {
  try {
    const culturas = lerCulturas();
    const cultura = culturas.find(c => c.id === parseInt(req.params.id));
    
    if (!cultura) {
      return res.status(404).json({ erro: 'Cultura não encontrada' });
    }
    
    res.json(cultura);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar cultura' });
  }
});

// POST - criar nova cultura
router.post('/', (req, res) => {
  try {
    const { nome, descricao, cicloEmDias, rendimentoPorHectare } = req.body;
    
    // Validação
    if (!nome || !descricao || !cicloEmDias || rendimentoPorHectare === undefined) {
      return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    }
    
    const culturas = lerCulturas();
    const novaCultura = {
      id: gerarId(culturas),
      nome,
      descricao,
      cicloEmDias,
      rendimentoPorHectare
    };
    
    culturas.push(novaCultura);
    salvarCulturas(culturas);
    
    res.status(201).json(novaCultura);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar cultura' });
  }
});

// PUT - atualizar cultura
router.put('/:id', (req, res) => {
  try {
    const { nome, descricao, cicloEmDias, rendimentoPorHectare } = req.body;
    const culturas = lerCulturas();
    const indice = culturas.findIndex(c => c.id === parseInt(req.params.id));
    
    if (indice === -1) {
      return res.status(404).json({ erro: 'Cultura não encontrada' });
    }
    
    if (!nome || !descricao || !cicloEmDias || rendimentoPorHectare === undefined) {
      return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    }
    
    culturas[indice] = {
      id: culturas[indice].id,
      nome,
      descricao,
      cicloEmDias,
      rendimentoPorHectare
    };
    
    salvarCulturas(culturas);
    res.json(culturas[indice]);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar cultura' });
  }
});

// DELETE - remover cultura
router.delete('/:id', (req, res) => {
  try {
    const culturas = lerCulturas();
    const indice = culturas.findIndex(c => c.id === parseInt(req.params.id));
    
    if (indice === -1) {
      return res.status(404).json({ erro: 'Cultura não encontrada' });
    }
    
    const culturaRemovida = culturas.splice(indice, 1);
    salvarCulturas(culturas);
    
    res.json({ mensagem: 'Cultura removida com sucesso', cultura: culturaRemovida[0] });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao remover cultura' });
  }
});

module.exports = router;
