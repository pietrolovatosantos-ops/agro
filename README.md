# API AGRO - Sistema de Gestão Agrícola

Uma aplicação Full-Stack completa para gerenciar culturas e plantações agrícolas. Desenvolvida com **Node.js**, **Express** e **HTML/CSS/JavaScript** com Fetch API.

## 📋 Descrição

Sistema que permite o cadastro e gerenciamento de:
- **Culturas**: tipos de culturas plantadas (milho, soja, cana-de-açúcar, etc.)
- **Plantações**: registros de plantações específicas com data, área e status

## 🛠 Tecnologias Utilizadas

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5 + CSS3 + JavaScript (Fetch API)
- **Persistência**: JSON (arquivo)
- **Controle de Versão**: Git + GitHub

## 📂 Estrutura do Projeto

```
api-agro/
├── index.js                 # Servidor Express principal
├── package.json             # Dependências do projeto
├── .gitignore               # Arquivos ignorados pelo Git
├── README.md                # Este arquivo
├── routes/
│   ├── culturas.js          # Rotas CRUD para culturas
│   └── plantacoes.js        # Rotas CRUD para plantações
├── data/
│   ├── culturas.json        # Base de dados de culturas
│   └── plantacoes.json      # Base de dados de plantações
└── public/
    ├── index.html           # Página principal
    ├── style.css            # Estilos CSS
    └── app.js               # Lógica front-end com Fetch
```

## ⚙️ Instalação

### Pré-requisitos
- Node.js (versão 14+)
- npm ou yarn

### Passo a Passo

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/seu-usuario/api-agro.git
   cd api-agro
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Iniciar o servidor**
   ```bash
   npm start
   ```

4. **Abrir no navegador**
   Acesse `http://localhost:3000`

## 🚀 Endpoints da API

### Culturas
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/api/culturas` | Listar todas as culturas | 200 |
| GET | `/api/culturas/:id` | Buscar cultura por ID | 200/404 |
| POST | `/api/culturas` | Criar nova cultura | 201/400 |
| PUT | `/api/culturas/:id` | Atualizar cultura | 200/404/400 |
| DELETE | `/api/culturas/:id` | Remover cultura | 200/404 |

### Plantações
| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/api/plantacoes` | Listar todas as plantações | 200 |
| GET | `/api/plantacoes/:id` | Buscar plantação por ID | 200/404 |
| POST | `/api/plantacoes` | Criar nova plantação | 201/400 |
| PUT | `/api/plantacoes/:id` | Atualizar plantação | 200/404/400 |
| DELETE | `/api/plantacoes/:id` | Remover plantação | 200/404 |

## 📝 Exemplo de Requisições

### Criar Cultura
```bash
curl -X POST http://localhost:3000/api/culturas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Arroz",
    "descricao": "Cereal essencial na alimentação",
    "cicloEmDias": 120,
    "rendimentoPorHectare": 6.0
  }'
```

### Listar Culturas
```bash
curl http://localhost:3000/api/culturas
```

### Criar Plantação
```bash
curl -X POST http://localhost:3000/api/plantacoes \
  -H "Content-Type: application/json" \
  -d '{
    "culturaId": 1,
    "dataSemeadura": "2026-04-15",
    "areaEmHectares": 50,
    "status": "em crescimento"
  }'
```

## 🎨 Interface

A aplicação possui uma interface responsiva com:
- ✅ Abas para navegação entre Culturas e Plantações
- ✅ Formulários com validação
- ✅ Listagem dinâmica de registros
- ✅ Botões para remover registros
- ✅ Mensagens de feedback visual (sucesso/erro)
- ✅ Design moderno com cores temáticas

## 💾 Modelo de Dados

### Cultura
```json
{
  "id": 1,
  "nome": "Milho",
  "descricao": "Cereal versátil para alimentação e ração animal",
  "cicloEmDias": 120,
  "rendimentoPorHectare": 8.5
}
```

### Plantação
```json
{
  "id": 1,
  "culturaId": 1,
  "dataSemeadura": "2026-04-15",
  "areaEmHectares": 10,
  "status": "em crescimento"
}
```

## ✨ Recursos

- ✅ CRUD completo para Culturas
- ✅ CRUD completo para Plantações
- ✅ Persistência em JSON
- ✅ Validação de dados obrigatórios
- ✅ Tratamento de erros com status HTTP apropriados
- ✅ Frontend dinâmico com Fetch API
- ✅ Interface responsiva
- ✅ Mensagens de feedback ao usuário

## 🐛 Tratamento de Erros

A API retorna respostas padronizadas em JSON:

**Sucesso (200/201)**
```json
{ "id": 1, "nome": "Milho", ... }
```

**Erro (400 - Validação)**
```json
{ "erro": "Campos obrigatórios faltando" }
```

**Erro (404 - Não encontrado)**
```json
{ "erro": "Cultura não encontrada" }
```

## 📦 Commits

O projeto contém commits significativos descrevendo cada etapa:
1. Estrutura inicial e dependências
2. Criação das rotas de culturas (CRUD)
3. Criação das rotas de plantações
4. Frontend HTML/CSS
5. Integração com Fetch API

## 📄 Licença

Este projeto é fornecido como trabalho avaliativo para fins educacionais.

## 👨‍💼 Autor

Desenvolvido como trabalho avaliativo da disciplina Backend - 3º Ano Ensino Técnico.

---

**Data de Entrega**: Conforme informado no Google Classroom

**Dúvidas?** Converse com o professor durante as aulas ou envie mensagem pelo Google Classroom.