import { Injectable, signal } from "@angular/core";
import { Navigation } from "src/app/@theme/types/navigation";

@Injectable({
  providedIn: 'root'
})

export class MenuSignal {

  menusDefault: Navigation[] = [];

  public currentMenu = signal(this.menusDefault)
}
