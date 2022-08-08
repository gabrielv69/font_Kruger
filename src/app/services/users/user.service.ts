import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_SERVER = 'http://localhost:8080/user/';

  constructor(private httpClient: HttpClient) { }

  public getAllUsuarios(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }

  public saveUsuarios(usuario: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER, usuario);
  }

  public deleteUsuario(id: number): Observable<any> {
    return this.httpClient.delete(this.API_SERVER + "delete/"+ id);
  }
  
}
