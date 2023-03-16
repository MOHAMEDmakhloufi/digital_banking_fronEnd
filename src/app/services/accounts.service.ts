import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/Account";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId : string, page: number, size:number): Observable<AccountDetails>{
    return this.http
      .get<AccountDetails>(environment.backendHost+
        `/accounts/${accountId}/pageOperations?page=${page}&size=${size}`);
  }

  public debit(accountId : string, amount : number, description: string){
    return this.http.post(environment.backendHost+
      `/accounts/debit/${accountId}?amount=${amount}&description=${description}`, null);
  }
  public credit(accountId : string, amount : number, description: string){
    return this.http.post(environment.backendHost+
      `/accounts/credit/${accountId}?amount=${amount}&description=${description}`, null);
  }
  public transfer(accountId : string, accountDestination: string, amount : number, description: string){
    return this.http.post(environment.backendHost+
      `/accounts/transfer/${accountId}/${accountDestination}?amount=${amount}&description=${description}`, null);
  }
}
