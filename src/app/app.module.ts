import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './route';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AppComponent } from './app.component';
import { EmissaoBoletoComponent } from './emissao-boleto/emissao-boleto.component';
import { ConsultaBoletoComponent } from './consulta-boleto/consulta-boleto.component';
import { TopoComponent } from './topo/topo.component';
import { DetalheBoletoComponent } from './detalhe-boleto/detalhe-boleto.component';

@NgModule({
  declarations: [
    AppComponent,
    EmissaoBoletoComponent,
    ConsultaBoletoComponent,
    TopoComponent,
    DetalheBoletoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    CurrencyMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
