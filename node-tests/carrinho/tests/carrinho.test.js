/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import Carrinho from '../carrinho.js';
import Item from '../item.js';

describe('Testes do carrinho', () => {
  it('Deve inicializar vazio', () => {
    const carrinho = new Carrinho();
    expect(carrinho.subtotal).toBeNull();
  });

  it('Deve ter 2 itens', () => {
    const item = new Item('Batata', 1.5, 6);
    const item2 = new Item('Maçã', 0.7, 5);
    const carrinho = new Carrinho();

    carrinho.adiciona(item);
    carrinho.adiciona(item2);

    expect(carrinho.itens).toContain(item);
    expect(carrinho.itens).toContain(item2);
  });

  it('Deve conter a prorpiedade "total" na inicialização', () => {
    const carrinho = new Carrinho();
    expect(carrinho).toHaveProperty('total');
  });
});
