import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {delay, map, Observable, of, tap} from "rxjs";
import {Customer} from "../model/Customer";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient, private authService: AuthService) { }
  public getCustomers() : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers");
  }

  public searchCustomers(keyWord: string) : Observable<Array<Customer>>{
    setTimeout(() =>{}, 1000);
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers/search?keyword="+keyWord);
  }

  public saveCustomers(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(environment.backendHost+"/customers/save",  customer).pipe(delay(6000));
  }

  public deleteCustomer(customerId : number){
    return this.http.delete(environment.backendHost+`/customers/delete/${customerId}`);
  }
}
