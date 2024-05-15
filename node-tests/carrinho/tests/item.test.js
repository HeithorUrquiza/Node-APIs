/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import Item from '../item.js';

describe('Teste dos itens', () => {
  it('Deve conter 3 campos: nome, valor e quantidade', () => {
    const item = new Item('Beterraba', 2.5, 10);

    expect(item.nome).toBe('Beterraba');
    expect(item.valor).toBe(2.5);
    expect(item.quantidade).toBe(10);
  });

  it('Deve ter o preço calculado com base na quantidade', () => {
    const item = new Item('Batata', 1.6, 5);

    expect(item.pegaValorTotalItem()).toBeCloseTo(8.0);
  });
});
