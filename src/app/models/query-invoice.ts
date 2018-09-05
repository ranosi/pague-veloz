export interface IInvoiceQuery {
  dataInicio: Date,
  dataFim: Date,
  status: string,
  documento: string,
  seuNumero: string,
  incluirCancelados: boolean,
  apenasAgendados: boolean,
  naoVisualizados: boolean
}

export class InvoiceQuery implements IInvoiceQuery {
  constructor(
    public dataInicio: Date,
    public dataFim: Date,
    public status: string,
    public documento: string,
    public seuNumero: string,
    public incluirCancelados: boolean,
    public apenasAgendados: boolean,
    public naoVisualizados: boolean
  ) { }

}

export enum StatusBoletoRelatorio {
  Todos,
  Pagos,
  Vencidos,
  AVencer,
  Emitidos
}
