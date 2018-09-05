import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedFunctions } from './shared/shared-functions.service';
import { IInvoiceQuery } from './models/query-invoice';
import { IInvoice } from './models/invoice';
import { IInvoiceInput } from './models/create-invoice';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic cmFmYWVsLm5vZ3VlaXJhQGdtYWlsLmNvbTowOGU5NzZhMy1jYWIwLTQ3YjUtODUyYS1hYjQ2MWFiMDBkYmM='
  })
}

@Injectable({
  providedIn: 'root'
})

export class BoletoService {

  private reqUrl = 'https://sandbox.pagueveloz.com.br/api';

  constructor( private http: HttpClient, private sharedFunctions: SharedFunctions ) { }

  public createInvoice(params: IInvoiceInput): Observable<any> {
    return this.http.post<IInvoiceInput>(`${this.reqUrl}/v4/Boleto/`, params, httpOptions)
  }

  public getInvoices(params: IInvoiceQuery): Observable<IInvoice[]> {
    let httpParams = new HttpParams()
    for(let param in params) {
      if(params[param])
        httpParams = httpParams.set(`${param}`, `${params[param]}`)
    }

    return this.http.get<IInvoiceQuery>(`${this.reqUrl}/v4/Boleto?${httpParams}`, httpOptions)
      .pipe(
        map((boletos: IInvoice[])=> {
          boletos.map((boleto: IInvoice) => {
            boleto.Emissao = this.sharedFunctions.dateDefault(boleto.Emissao);
            boleto.Vencimento = this.sharedFunctions.dateDefault(boleto.Vencimento);
            boleto.Valor = this.sharedFunctions.labelMoney(boleto.Valor);
            boleto.Cancelado = this.sharedFunctions.translateStatus(boleto.Cancelado);
            return boleto;
          })
          return boletos;
        })
      )
  }

  public deleteInvoices(params: number):Observable<any> {
    return this.http.delete(`${this.reqUrl}/v5/Boleto/${params}`, httpOptions);
  }

}
