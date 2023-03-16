import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CustomerService } from './customer.service';
import {Observable, of, tap} from "rxjs";
import {Customer} from "../model/Customer";

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CustomerService);
    //ttpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    let customer: Customer= {
      "id": 14,
      "name": "med",
      "email": "sami@"
    };
    expect(customer.name).toEqual("med");
    service.getCustomers().pipe(
      tap( data => expect(data).toEqual([customer]))
    );




  });
});
