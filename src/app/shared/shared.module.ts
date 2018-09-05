import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        PanelModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        CheckboxModule,
        RadioButtonModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        KeyFilterModule,
        DropdownModule,
        TableModule,
        ConfirmDialogModule
    ],
    providers: [ MessageService, ConfirmationService ],
    declarations: [ ]
})
export class SharedModule { }
