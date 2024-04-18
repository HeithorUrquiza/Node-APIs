const dataSource = require('../database/models');

class Services {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }
  
  async pegaTodosOsRegistros() {
    return dataSource[this.model].findAll();
  }

  async pegaRegistrosPorEscopo (escopo) {
    return dataSource[this.model].scope(escopo).findAll();
  }

  async pegaUmRegistroPorId(id) {
    return dataSource[this.model].findByPk(id);
  }

  async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({ where: {...where}});
  }

  async criaRegistro(dadosDoRegistro) {
    return dataSource[this.model].create(dadosDoRegistro);
  }

  async atualizaRegistro(dadosAtualizados, id) {
    const listadeRegistrosAtualizados = await dataSource[this.model].update(dadosAtualizados, {
      where: { id: id }
    });
    const foiAtualizado = listadeRegistrosAtualizados[0] !== 0;
    return foiAtualizado;
  }

  async excluiRegistro(id) {
    return dataSource[this.model].destroy({ where: { id: id } });
  }
}

module.exports = Services;