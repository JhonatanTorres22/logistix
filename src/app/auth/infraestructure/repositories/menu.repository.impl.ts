import { Injectable } from "@angular/core";
import { MenuRepository } from "../../domain/repositories/menu.repository";
import { MenuService } from "../services/menu.service";
import { Observable } from "rxjs";
import { RolMenu } from "../../domain/models/menu.model";

@Injectable({
    providedIn: 'root'
})

export class MenuRepositoryImpl implements MenuRepository {
  constructor(private service: MenuService) { }

  obtenerMenu(): Observable<RolMenu[]> {
    // Aquí llamas al servicio que hace el GET al backend
    return this.service.obtenerMenu();
  }
}
