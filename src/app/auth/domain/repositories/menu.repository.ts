import { Observable } from "rxjs";
import { RolMenu } from "../models/menu.model";

export abstract class MenuRepository {
  abstract obtenerMenu(): Observable<RolMenu[]>;
}
