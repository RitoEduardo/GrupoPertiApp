import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMovieDetail, IMovieInfo, IMovieShow } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class TvmazeService {

  URL: string;
  constructor(private http: HttpClient) { 
    this.URL = 'http://api.tvmaze.com'
  }

  getAll() : Observable<IMovieInfo[]>{
    return this.http.get<IMovieInfo[]>( `${this.URL}/schedule/full`, {});
  }

  getByName( searchText: string ): Observable<IMovieShow[]>{
    const url = `${ this.URL }/search/shows?q=${searchText}`;
    return this.http.get<IMovieShow[]>(url, {});
  }

  getById( id: number ): Observable<IMovieDetail>{
    const url = `${ this.URL }/shows/${id}`;
    return this.http.get<IMovieDetail>(url, {});
  }
}
