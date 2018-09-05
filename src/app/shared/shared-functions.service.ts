import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})

export class SharedFunctions {
  public dateToday(): Date {
    return moment().toDate();
  }

  public dateParse(date: Date): string {
    return moment(date).format();
  }

  public dateDefault(date: Date | string): string {
    if(!date) return;
    return moment(date).format("DD-MM-YYYY");
  }

  public datePlusday(addDays:number, date: Date): Date {
    return moment(date).add(addDays, 'd').toDate();
  }

  public labelMoney(valor: number | string ): string {
    return 'R$ ' + parseFloat(valor.toString()).toFixed(2).toString().replace('.',',')
  }

  public translateStatus(status: boolean | string): string {
    return status === true ? "Sim" : "Não";
  }
}
