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

  it('Deve retornar o valor total da compra', () => {
    const item = new Item('Mel', 2, 5);
    const carrinho = new Carrinho();

    carrinho.adiciona(item);
    carrinho.adicionaFrete(10);

    expect(carrinho.calculaTotal()).toBe(20);
  });

  it('Deve conter a prorpiedade "total" na inicialização', () => {
    const carrinho = new Carrinho();
    expect(carrinho).toHaveProperty('total');
  });

  it('Deve lançar erro ao finalizar compra com carrinho vazio', () => {
    function englobaErroCarrinho() {
      const carrinho = new Carrinho();
      carrinho.finalizaCompra();
    }

    expect(englobaErroCarrinho).toThrowError('Carrinho de compras vazio');
  });

  it('Deve finalizar as compras', () => {
    const item = new Item('Beterraba', 2, 5);
    const item2 = new Item('Mel', 1.5, 2);
    const carrinho = new Carrinho();

    carrinho.adiciona(item);
    carrinho.adiciona(item2);
    carrinho.adicionaFrete(10);

    expect(carrinho.finalizaCompra()).toStrictEqual({
      subtotal: 13,
      frete: 10,
      total: 23,
    });
  });
});
