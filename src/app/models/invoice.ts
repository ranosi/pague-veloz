export interface IInvoice {
  Cancelado: boolean | string,
  CodigoBarras: string,
  DataEnvioEmail: Date,
  DataPagamento: Date,
  Documento: string,
  Email: string,
  Emissao: string,
  EstaVencido: boolean,
  Id: number,
  Linha1: string,
  Linha2: string,
  LinhaDigitavel: string,
  NossoNumero: string,
  Parcela: string,
  QuantidadePagamentos: number,
  QuantidadeRejeicoes: number,
  QuantidadeVisualizacoes: number,
  Sacado: string,
  SeuNumero: string,
  TarifasCobradas: recTarifas,
  TemPagamento: boolean,
  Url: string,
  Valor: string,
  ValorEmBaixaOperacional: number,
  ValorLiquido: number,
  ValorPago: number,
  Vencimento: string
}

interface recTarifas {
  Tipo: string,
  Valor: number
}

