export interface IInvoiceInput {
    Sacado: string,
    CpfCnpjSacado: string,
    Vencimento: Date,
    DataEnvioEmail: Date,
    Valor: number,
    Parcela: string,
    SeuNumero: string,
    Linha1: string,
    Linha2: string,
    Email: string,
    Pdf: boolean,
}

export interface IInvoiceCreated {
  Id: string,
  Url: string
}

export class InvoiceData implements IInvoiceInput {
    constructor (
        public Sacado: string,
        public CpfCnpjSacado: string,
        public Vencimento: Date,
        public DataEnvioEmail: Date,
        public Valor: number,
        public Parcela: string,
        public SeuNumero: string,
        public Linha1: string,
        public Linha2: string,
        public Email: string,
        public Pdf: boolean
    ) { }
}
