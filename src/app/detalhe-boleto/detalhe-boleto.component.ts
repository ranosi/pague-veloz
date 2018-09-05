import { Component, OnInit } from '@angular/core';
import { BoletoService } from '../boleto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalhe-boleto',
  templateUrl: './detalhe-boleto.component.html',
  styles: []
})
export class DetalheBoletoComponent implements OnInit {

  public invoice: any;

  constructor(private boletoService: BoletoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getInvoice(params.id)
    })

  }

  public getInvoice(id: number) {
    this.boletoService.showInvoice(id)
      .subscribe(response => this.invoice = response)
  }

  public btnGoBack(): void {
    this.router.navigate(['../consulta'])
  }

}
