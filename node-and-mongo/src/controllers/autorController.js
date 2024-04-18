import NaoEncontrado from '../errors/NaoEncontrado.js';
import { autor } from '../models/index.js';

class AutorController {
  static async listarAutores(req, res, next) {
    try {
      const listaAutores = autor.find({});
      req.resultado = listaAutores;
      next();
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const { id } = req.params;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).send(autorEncontrado);
      } else {
        next(new NaoEncontrado('Id do Autor não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: 'criado com sucesso', autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const { id } = req.params;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);

      if (autorEncontrado !== null) {
        res.status(200).json({ message: 'autor atualizado' });
      } else {
        next(new NaoEncontrado('Id do Autor não localizado.'));
      }
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na atualização` });
    }
  }

  static async deletarAutor(req, res, next) {
    try {
      const { id } = req.params;
      const autorEncontrado = await autor.findByIdAndDelete(id);

      if (autorEncontrado !== null) {
        res.status(200).json({ message: 'autor deletado com sucesso' });
      } else {
        next(new NaoEncontrado('Id do Autor não localizado.'));
      }
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na exclusão` });
    }
  }
}

export default AutorController;
