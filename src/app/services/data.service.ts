import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse, IDataUser } from '../interfaces/data';

export interface IGetResponse{
  users: IDataUser[];
  firstUser: IDataUser;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  URL: string;

  constructor(private http: HttpClient) { 
    this.URL =  'https://randomuser.me/api';
  }

  getUser() : Observable<IGetResponse>{
    return this.http.get<any>(this.URL, {}).pipe( 
      map((data: IResponse) => ({
        users: data.results,
        firstUser: data.results ? data.results[0] : null
      })
    )
    )
  }

}
