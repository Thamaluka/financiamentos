import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()
export class HomeServiceService {

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

  };
  public apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient) {
    this.httpOptions.headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  sendTable(table): Observable<any> {
    return this.http.get(this.apiUrl + '/table?valorDoImovel=' + table.valorDoImovel + '&taxa=' + table.taxa + '&parcelas=' + (table.totalParcela - 1) + '&valorDaEntrada=' + table.valorDaEntrada, this.httpOptions).pipe(
      map(this.extractData));
  }



}
