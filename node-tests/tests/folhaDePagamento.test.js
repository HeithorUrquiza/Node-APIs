/* eslint-disable import/extensions */
/* eslint-disable no-undef */

import { calcularHorasExtras, calcularDesconto } from '../index.js';

describe('Todos os testes da folha de pagamento', () => {
  test('Deve retornar o valor total das horas extras', () => {
    const esperado = 2500;
    const resultado = calcularHorasExtras(2000, 500);

    expect(resultado).toBe(esperado);
  });

  test('Deve retornar o valor após o desconto', () => {
    const esperado = 2200;
    const resultado = calcularDesconto(2500, 300);

    expect(resultado).toBe(esperado);
  });
});
