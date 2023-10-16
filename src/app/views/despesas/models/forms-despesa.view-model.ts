import { FormaPagamento } from './forma-pagamento';

export type FormsDespesaViewModel = {
  descricao: string;
  valor: number;
  data: Date;
  formaPagamento: FormaPagamento;
  categoriasSelecionadas: string[];
};