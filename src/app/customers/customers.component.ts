import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "src/app/model/Customer";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  customers$: Observable<Array<Customer>>;
  errorMessage: string;
  searchFormGroup: FormGroup;
  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private route : Router) {}

  ngOnInit(): void {

      this.searchFormGroup= this.fb.group({
        keyword : this.fb.control("")
      })

      this.customers$ = this.customerService.getCustomers().pipe(
        catchError(err => {
          this.errorMessage = err.message;
          return throwError(err);
        })
      );
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup.value.keyword;
    this.customers$= this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
      next : resp => this.handleSearchCustomers(),
      error : err => console.log(err)
    });
  }

  handleAccountsCustomer(id: number, customer: Customer) {
    this.route.navigateByUrl(`customer-accounts/${id}`, {state: customer});
  }
}
