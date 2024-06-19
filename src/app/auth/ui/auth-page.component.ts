import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { SharedModule } from "../../demo/shared/shared.module";



@Component({
    selector: 'auth-page',
    templateUrl: './auth-page.component.html',
    styleUrls: ['./auth-page.component.scss'],
    standalone: true,
    imports: [ CommonModule, SharedModule ]
})

export class AuthComponent {
    
}