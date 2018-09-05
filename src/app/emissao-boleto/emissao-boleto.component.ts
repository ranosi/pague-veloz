import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceData, IInvoiceInput, IInvoiceCreated } from '../models/create-invoice';
import { BoletoService } from '../boleto.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { SharedFunctions } from '../shared/shared-functions.service';

@Component({
  selector: 'app-emissao-boleto',
  templateUrl: './emissao-boleto.component.html',
  styles: []
})
export class EmissaoBoletoComponent implements OnInit {

  public formInvoice: FormGroup;
  public submitted: boolean = false;
  public validateDate: boolean = false;
  public responseBoleto: IInvoiceCreated;
  public urlBoleto: string;
  public today: Date = new Date();
  public minDate: Date = this.today;
  public pt: any;

  constructor(
    private formBuilder: FormBuilder,
    private boletoService: BoletoService,
    private messageService: MessageService,
    private router: Router,
    private sharedFunctions: SharedFunctions
  ) {

  }

  ngOnInit(): void {
    this.createForm();

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
  }

  public createForm(): void {
    this.formInvoice = this.formBuilder.group({
      sacado: ['', [Validators.required, Validators.maxLength(50)], ''],
      cpfCnpjSacado: ['', [Validators.required, Validators.maxLength(20)], ''],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(30)], ''],
      valor: ['', [Validators.required, Validators.maxLength(15)], ''],
      parcela: [''],
      seuNumero: [''],
      linha1: [''],
      linha2: [''],
      vencimento: [this.sharedFunctions.dateToday(), [Validators.required, Validators.maxLength(8)], ''],
      dataEnvioEmail: [''],
      pdf: ['']
    })
  }

  get form() {
    return this.formInvoice.controls
  }

  public submitCreatePayment(): void {
    this.submitted = true;
    if (this.formInvoice.invalid) return;

    const data = this.formInvoice.value;
    data.vencimento = this.sharedFunctions.dateParse(data.vencimento)
    data.pdf = data.pdf ? data.pdf : false;

    const invoice = new InvoiceData(
      data.sacado,
      data.cpfCnpjSacado,
      data.vencimento,
      data.dataEnvioEmail,
      data.valor,
      data.parcela,
      data.seuNumero,
      data.linha1,
      data.linha2,
      data.email,
      data.pdf
    );

    this.createInvoice(invoice);
  }

  public createInvoice(params: IInvoiceInput): void {
    this.boletoService.createInvoice(params)
      .subscribe(
        (response: IInvoiceCreated) => {
          this.responseBoleto = response
          this.showConfirm()
        },
        (error: any) => this.showError(Object.values(error.error)[0])
    )
  }

  public showConfirm(): void {
    this.messageService.clear();
    this.messageService.add({ key: 'success', sticky: true, closable: false, severity: 'success', summary: `Boleto ${this.responseBoleto.Id}, criado com sucesso`, detail: 'Deseja cadastrar novo boleto?' });
  }

  public showError(message: any): void {
    this.messageService.clear();
    this.messageService.add({ key: 'error', sticky: true, closable: false, severity: 'warn', summary: message });
  }

  public erroToast(): void {
    this.messageService.clear();
  }

  public closeToast(): void {
    this.messageService.clear();
    this.btnGoBack();
  }

  public confirmToast(): void {
    this.messageService.clear();
    this.btnClearForm()
  }

  public btnClearForm(): void {
    this.formInvoice.reset()
    this.submitted = false;
  }

  public btnGoBack(): void {
    this.router.navigate(['../consulta'])
  }

}
