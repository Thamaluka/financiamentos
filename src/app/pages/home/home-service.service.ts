import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class HomeServiceService {

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  public apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getTable(): Observable<any> {
    return this.http.get(this.apiUrl + '/table?name='+'Jessica', this.httpOptions).pipe(
      map(this.extractData));
  }

  

}
