import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { MenuResponseDTO } from "../dto/menu.dto";
import { MenuMapper } from "../../domain/mappers/menu.mapper";
import { RolMenu } from "../../domain/models/menu.model";

@Injectable({
  providedIn: 'root'
})

export class MenuService {
    private urlApi: string
  private urlListarMenu: string

  constructor(
    private http : HttpClient
  ){
    this.urlApi = environment.EndPoint,
    this.urlListarMenu = '/api/usuario/ListarMenu'
  }


  obtenerMenu = () :  Observable<RolMenu[]> =>{
    return this.http.get<MenuResponseDTO>(this.urlApi + this.urlListarMenu).pipe(
        map((apiMenu) => apiMenu.data.map(MenuMapper.fromDTO))
    )
  }
}