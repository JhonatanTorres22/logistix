import { Injectable, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UiModalComponent } from "./ui-modal.component";
import { uiModalData, uiModalTemplateData } from "./ui-modal.interface";
import { UiModalTemplateComponent } from "../ui-modal-template/ui-modal-template.component";


@Injectable({
    providedIn: 'root'
})


export class UiModalService {

    dialogRef: MatDialogRef<any>;

    constructor( private matDialog: MatDialog ) {

    }


    open( data: uiModalData ) {
       return this.matDialog.open( UiModalComponent, { data } );
    }

    openTemplate( data: uiModalTemplateData ) {
        return this.dialogRef = this.matDialog.open( UiModalTemplateComponent, { 
            data,
            disableClose: true,
        } )
    }

    getRefModal() {
        return this.dialogRef;
    }


}