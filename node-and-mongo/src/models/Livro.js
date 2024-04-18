import mongoose from 'mongoose';
import { autorSchema } from './Autor.js';

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: [true, 'Título é um campo obrigatório'] },
  editora: { 
    type: String, 
    required: [true, 'Editora é um campo obrigatório'],
    enum: {
      values: ["Casa do Código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido"
    }
  },
  preco: { type: Number },
  paginas: { 
    type: Number, 
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de págins precisa estar entre 10 e 5000"
    }
  },
  autor: autorSchema,
}, { versionKey: false }); // Apenas evitando o versionamento do mongo

const livro = mongoose.model('livros', livroSchema);

export default livro;
