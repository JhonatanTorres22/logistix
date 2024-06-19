import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UiButtonComponent } from 'src/app/core/components/ui-button/ui-button.component';
import { UiInputComponent } from 'src/app/core/components/ui-input/ui-input.component';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { UsuarioRol } from 'src/app/usuarios/domain/models/usuario-rol.model';
import { Usuario } from 'src/app/usuarios/domain/models/usuario.model';

@Component({
  selector: 'decano-add',
  standalone: true,
  imports: [ CommonModule, SharedModule, UiButtonComponent, UiInputComponent],
  templateUrl: './decano-add.component.html',
  styleUrl: './decano-add.component.scss'
})
export class DecanoAddComponent {

}