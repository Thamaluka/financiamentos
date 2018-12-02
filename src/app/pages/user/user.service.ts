import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()

export class UserService {
    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),

    };
    public apiUrl = "http://localhost:3000/table";

    constructor(private http: HttpClient) {
        this.httpOptions.headers.append("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    sendNewUser(user): Observable<any> {
        return this.http.post(this.apiUrl + '/new?salario_usuario=' + user.salary + '&taxa_anual=' + user.taxaAnual + 'percentual_entrada=' +
            user.entrada + '&nome_completo=' + user.name + '&cpf=' + user.cpf + '&data_nascimento=' + user.dataNascimento + '&hasFgts=' + user.fgts + '&valorFgts=' + user.valorFgts, this.httpOptions).pipe(
                map(this.extractData));
    }



}