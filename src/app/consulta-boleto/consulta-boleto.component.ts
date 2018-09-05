import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { InvoiceQuery, IInvoiceQuery } from '../models/query-invoice';
import { IInvoice } from '../models/invoice';
import { BoletoService } from '../boleto.service';
import { SharedFunctions } from '../shared/shared-functions.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as moment from "moment";
@Component({
  selector: 'app-consulta-boleto',
  templateUrl: './consulta-boleto.component.html',
  styles: []
})

export class ConsultaBoletoComponent implements OnInit {
  public formQueryInvoice: FormGroup;
  public submitted: boolean;
  public status: SelectItem[];
  public selectedStatus: string;
  public cols: any[];
  public invoices: IInvoice[];
  public invoiceTotal: number;
  public dateMinimum: Date;
  public itemsPerPage: number = 10;
  public pt:any;

  constructor(
    private formBuilder: FormBuilder,
    private boletoService: BoletoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private sharedFunctions: SharedFunctions,
    private router: Router,
  ) { }

  public ngOnInit() {

    this.createFormQueryInvoice();
    this.dateMinimum = this.formQueryInvoice.get('dataInicio').value;

    this.status = [
      { value: '', label: 'Escolha um status' },
      { value: 'todos', label: 'Todos' },
      { value: 'pagos', label: 'Pagos' },
      { value: 'vencidos', label: 'Vencidos' },
      { value: 'avencer', label: 'A Vencer' },
      { value: 'emitidos', label: 'Emitidos' }
    ];

    this.cols = [
      {field: 'Sacado', header: 'Sacado' },
      {field: 'Emissao', header: 'Emissão'},
      {field: 'Vencimento', header: 'Vencimento'},
      {field: 'Documento', header: 'Documento'},
      {field: 'Valor', header: 'Valor'},
      {field: 'Cancelado', header: 'Cancelado'},
    ];

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do","Se","Te","Qu","Qu","Se","Sa"],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
      today: 'Hoje',
      clear: 'Limpar'
    };

    let filtro = JSON.parse(sessionStorage.getItem('pesquisa'))
    if(filtro) {
      filtro.dataInicio = this.sharedFunctions.date(filtro.dataInicio);
      filtro.dataFim = this.sharedFunctions.date(filtro.dataFim);
      this.formQueryInvoice.patchValue(filtro);
      this.submitQueryInvoice();
    }
  }

  public createFormQueryInvoice() {
    this.formQueryInvoice = this.formBuilder.group({
      dataInicio: [this.sharedFunctions.dateToday()],
      dataFim: [this.sharedFunctions.datePlusday(1, this.sharedFunctions.dateToday())],
      selectedStatus: [''],
      documento: [''],
      seuNumero: [''],
      incluirCancelados: [''],
      apenasAgendados: [''],
      naoVisualizados: ['']
    });
  }

  public submitQueryInvoice() {
    if (this.formQueryInvoice.invalid) return;

    sessionStorage.setItem('pesquisa', JSON.stringify(this.formQueryInvoice.value))

    const data = this.formQueryInvoice.value;
    data.dataInicio = this.sharedFunctions.dateParse(data.dataInicio);
    data.dataFim = this.sharedFunctions.dateParse(data.dataFim);

    const invoice = new InvoiceQuery(
      data.dataInicio,
      data.dataFim,
      data.selectedStatus,
      data.documento,
      data.seuNumero,
      data.incluirCancelados,
      data.apenasAgendados,
      data.naoVisualizados
    )

    this.queryInvoice(invoice);
  }

  public queryInvoice(invoice: IInvoiceQuery) {
    this.boletoService.getInvoices(invoice)
      .subscribe((invoices: IInvoice[]) => {
        this.invoices = invoices;
        this.invoiceTotal = this.invoices.length
      })
  }

  public delete(invoice: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja apagar o boleto selecionado?',
      accept: () => {
        this.boletoService.deleteInvoices(invoice.Id)
          .subscribe(
            (response: any) => {
              this.messageService.add({severity:'success', summary:'Sucesso', detail:'Boleto deletado.'});
              this.invoices = this.invoices.filter((val, i) => val != invoice);
            },
            (error: Error) => this.messageService.add({severity:'error', summary:'Erro', detail:'Não foi possível deletar o boleto.'})
          )
      }
    });
  }

  public detail(invoice: any) {
    this.router.navigate(['detalhe', invoice.Id]);
  }

  public btnClearForm() {
    this.formQueryInvoice.reset();
    sessionStorage.removeItem('pesquisa')
  }

}
