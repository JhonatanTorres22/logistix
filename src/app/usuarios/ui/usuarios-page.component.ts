import { Component } from "@angular/core";

import { CommonModule } from "@angular/common";

import { UserListComponent } from "./user-list/user-list.component";
import { SharedModule } from "src/app/demo/shared/shared.module";


@Component({
    selector: 'usuarios-page',
    standalone: true,
    imports: [CommonModule, SharedModule, UserListComponent],
    templateUrl: './usuarios-page.component.html',
    styleUrls: ['./usuarios-page.component.scss']
})

export class UsuariosPageComponent {}