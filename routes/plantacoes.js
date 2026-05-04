const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/plantacoes.json');

// Funções auxiliares
function lerPlantacoes() {
  try {
    const dados = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(dados);
  } catch (erro) {
    return [];
  }
}

function salvarPlantacoes(plantacoes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(plantacoes, null, 2));
}

function gerarId(plantacoes) {
  return plantacoes.length > 0 ? Math.max(...plantacoes.map(p => p.id)) + 1 : 1;
}

// ROTAS

// GET - listar todas as plantações
router.get('/', (req, res) => {
  try {
    const plantacoes = lerPlantacoes();
    res.json(plantacoes);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao listar plantações' });
  }
});

// GET - buscar plantação por ID
router.get('/:id', (req, res) => {
  try {
    const plantacoes = lerPlantacoes();
    const plantacao = plantacoes.find(p => p.id === parseInt(req.params.id));
    
    if (!plantacao) {
      return res.status(404).json({ erro: 'Plantação não encontrada' });
    }
    
    res.json(plantacao);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar plantação' });
  }
});

// POST - criar nova plantação
router.post('/', (req, res) => {
  try {
    const { culturaId, dataSemeadura, areaEmHectares, status } = req.body;
    
    // Validação
    if (!culturaId || !dataSemeadura || !areaEmHectares || !status) {
      return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    }
    
    const plantacoes = lerPlantacoes();
    const novaPlantacao = {
      id: gerarId(plantacoes),
      culturaId,
      dataSemeadura,
      areaEmHectares,
      status
    };
    
    plantacoes.push(novaPlantacao);
    salvarPlantacoes(plantacoes);
    
    res.status(201).json(novaPlantacao);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar plantação' });
  }
});

// PUT - atualizar plantação
router.put('/:id', (req, res) => {
  try {
    const { culturaId, dataSemeadura, areaEmHectares, status } = req.body;
    const plantacoes = lerPlantacoes();
    const indice = plantacoes.findIndex(p => p.id === parseInt(req.params.id));
    
    if (indice === -1) {
      return res.status(404).json({ erro: 'Plantação não encontrada' });
    }
    
    if (!culturaId || !dataSemeadura || !areaEmHectares || !status) {
      return res.status(400).json({ erro: 'Campos obrigatórios faltando' });
    }
    
    plantacoes[indice] = {
      id: plantacoes[indice].id,
      culturaId,
      dataSemeadura,
      areaEmHectares,
      status
    };
    
    salvarPlantacoes(plantacoes);
    res.json(plantacoes[indice]);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar plantação' });
  }
});

// DELETE - remover plantação
router.delete('/:id', (req, res) => {
  try {
    const plantacoes = lerPlantacoes();
    const indice = plantacoes.findIndex(p => p.id === parseInt(req.params.id));
    
    if (indice === -1) {
      return res.status(404).json({ erro: 'Plantação não encontrada' });
    }
    
    const plantacaoRemovida = plantacoes.splice(indice, 1);
    salvarPlantacoes(plantacoes);
    
    res.json({ mensagem: 'Plantação removida com sucesso', plantacao: plantacaoRemovida[0] });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao remover plantação' });
  }
});

module.exports = router;
