import express from 'express';
import { pessoa } from './model';
import { ULID, ulid } from 'ulid';
const app = express();
const port = 3000;

const pessoas: pessoa[] = [];

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/pessoas', async (req, res) => {
  const novaPessoa = req.body;
  novaPessoa.id = ulid()
  const data = novaPessoa.nascimento.split("-")
  const ano = parseInt(data[0])
  const mes = parseInt(data[1])
  const dia = parseInt(data[2])
  const stacks = novaPessoa.stack

  for(let pessoa of pessoas) {
    if(novaPessoa.apelido === pessoa.apelido) {
      return res.status(422).json({ mensagem: 'Apelido já usado' });
    }
  }

  for(let stack of stacks) {
    if(typeof stack != "string") {
      return res.status(400).json({ mensagem: 'Todas stacks devem ser string' });
    }
  }

  if (typeof novaPessoa.apelido != 'string') {
    return res.status(400).json({ mensagem: 'Apelido deve ser string' });
  } else if(!novaPessoa.apelido || novaPessoa.apelido.length > 32 || novaPessoa.apelido.trim() === '') {
    return res.status(422).json({ mensagem: 'Erro no apelido' });
  } else if (typeof novaPessoa.nome != 'string') {
    return res.status(400).json({ mensagem: 'Nome deve ser string' });
  } else if (!novaPessoa.nome || novaPessoa.nome.length > 100 || novaPessoa.nome.trim() === '') {
    return res.status(422).json({ mensagem: 'Erro no nome' });
  } else if (!novaPessoa.nascimento || ano < 1 || (mes < 1 || mes > 12) || (dia < 1 || dia > 31) ) {
    return res.status(422).json({ mensagem: 'Erro no nascimento' });
  } else {
    pessoas.push(novaPessoa);
    res.status(201).json({ mensagem: 'Pessoa adicionada com sucesso!', pessoa: novaPessoa });
  }

});

app.get('/pessoas/:id', (req, res) => {
  const id = req.params.id;

  for(let pessoa of pessoas) {
    if(`${pessoa.id}` === id) {
      res.send(pessoa);
      res.status(200);
    }
  }

  res.status(404).json({ mensagem: 'Pessoa não encontrada' });
});

app.get('/pessoas', (req, res) => {
  const pessoasBusca: pessoa[] = []
  const termoDeBusca = `${req.query.t}`.toLowerCase()

  if (!termoDeBusca) {
    return res.status(400).json({ mensagem: 'Informe o termo de busca na consulta (ex: /pessoas?t=termo-de-busca).' });
  }

  for (let pessoa of pessoas) {
    let pessoaAtendeCritério = false;

    if (pessoa.apelido.toLowerCase().includes(termoDeBusca) ||
        pessoa.nome.toLowerCase().includes(termoDeBusca)) {
      pessoaAtendeCritério = true;
    }

    for (let stacks of pessoa.stack) {
      if (stacks.toLowerCase().includes(termoDeBusca)) {
        pessoaAtendeCritério = true;
        break; // Interrompa o loop assim que encontrar uma correspondência
      }
    }

    if (pessoaAtendeCritério && !pessoasBusca.some((p) => p.id === pessoa.id)) {
      pessoasBusca.push(pessoa);
    }
  }

  res.status(200).json(pessoasBusca);
});


app.get('/contagem-pessoas', (req, res) => {
  const contagem = pessoas.length

  res.send(`A contagem de pessoas é : ${contagem}`);
  res.status(200);
});

app.listen(port, () => {
  console.log(`Servidor Express está rodando em http://localhost:${port}`);
});
