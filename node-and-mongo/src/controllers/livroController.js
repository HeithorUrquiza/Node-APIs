import { livro }  from '../models/index.js';
import { autor } from '../models/index.js';
import NaoEncontrado from '../errors/NaoEncontrado.js';

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;

      next()
    } catch (erro) {
      next(erro)
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const { id } = req.params;
      const livroEncontrado = await livro.findById(id);

      if(livroEncontrado !== null){
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado('Id do Livro não localizado.'));
      }
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição do livro` });
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: 'criado com sucesso', livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const { id } = req.params;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);

      if(livroEncontrado !== null){
        res.status(200).json({ message: 'livro atualizado' });
      } else {
        next(new NaoEncontrado('Id do Livro não localizado.'));
      }
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const { id } = req.params;
      const livroEncontrado = await livro.findByIdAndDelete(id);

      if(livroEncontrado !== null){
        res.status(200).json({ message: 'livro deletado com sucesso' });
      } else {
        next(new NaoEncontrado('Id do Livro não localizado.'));
      }
    } catch (erro) {
      next(erro)
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if(busca !== null){
        const livrosPorFiltro = livro.find(busca);
        req.resultado = livrosPorFiltro;
        next();
      } else {
        res.status(200).json([]);
      }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(params){
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;

  let busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = {$regex: titulo, $options: "i"};

  if(minPaginas || maxPaginas) busca.paginas = {}

  if(minPaginas) busca.paginas.$gte = minPaginas;
  if(maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const alvo = await autor.findOne({ nome: nomeAutor });

    if(alvo !== null){
      busca.autor = alvo;
    } else {
      busca = null
    }
  }
  
  return busca;
}

export default LivroController;