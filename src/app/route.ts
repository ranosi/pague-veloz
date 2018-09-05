import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmissaoBoletoComponent } from "./emissao-boleto/emissao-boleto.component";
import { ConsultaBoletoComponent } from "./consulta-boleto/consulta-boleto.component";

export const ROUTES: Routes = [
    { path: '', redirectTo: '/consulta', pathMatch: 'full' },
    { path: 'emissao-boleto', component: EmissaoBoletoComponent },
    { path: 'consulta', component: ConsultaBoletoComponent },
]

@NgModule({
    exports: [ RouterModule ],
    imports: [ RouterModule.forRoot(ROUTES) ],
})

export class AppRoutingModule { }
