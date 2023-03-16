import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/Account";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  account$: Observable<AccountDetails>;
  operationFormGroup: FormGroup;
  errorMessage : string;
  constructor(private fb: FormBuilder, private accountService: AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control("")
    });
    this.operationFormGroup = this.fb.group({

      operationType: this.fb.control('DEBIT'),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)
    });
  }


  handleSearchAccount() {
    let accountId: string = this.accountFormGroup.value.accountId;
    this.account$ = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage= err.error.message;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    if (operationType == 'DEBIT') {
      this.accountService.debit(accountId,
        this.operationFormGroup.value.amount,
        this.operationFormGroup.value.description).subscribe({
        next: data => {
          alert("Success Debit");
          this.handleSearchAccount()
        },
        error: err => {
          console.log(err)
        },
        complete : () => this.operationFormGroup.reset()
      });
    } else if (operationType == 'CREDIT') {
      this.accountService.credit(accountId,
        this.operationFormGroup.value.amount,
        this.operationFormGroup.value.description).subscribe({
        next: data => {
          alert("Success Debit");
          this.handleSearchAccount()
        },
        error: err => {
          console.log(err)
        },
        complete : () => this.operationFormGroup.reset()
      });
    } else if (operationType == 'TRANSFER') {
      this.accountService.transfer(accountId,
        this.operationFormGroup.value.accountDestination,
        this.operationFormGroup.value.amount,
        this.operationFormGroup.value.description).subscribe({
        next: data => {
          alert("Success Debit");
          this.handleSearchAccount()
        },
        error: err => {
          console.log(err)
        },
        complete : () => this.operationFormGroup.reset()
      });
    }

  }
}
