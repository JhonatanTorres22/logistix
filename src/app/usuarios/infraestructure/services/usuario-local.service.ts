import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export interface User {
    firstName: string
    lastName: string
  }

@Injectable({
    providedIn: 'root',
})

export class UsuarioLocalService { 

    // constructor(private http: HttpClient) {}

    // getUser() {
    //     return this.http.get<User>('https://api.example.com/cursos')
    // }


}