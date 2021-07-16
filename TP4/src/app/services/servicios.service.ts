import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }

  public get(url:string){
    return this.http.get(url)
  }

  public post(url:string, body: any){
    return this.http.post(url, body, {responseType: "text"});
  }

}
