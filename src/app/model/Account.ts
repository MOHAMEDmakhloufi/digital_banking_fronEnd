export interface AccountDetails{
  accountId: string;
  balance : number;
  currentAccount: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOS : AccountOperation[];
}
export interface AccountOperation{
  id: number;
  operationDate : Date;
  amount: number;
  operationType: string;
  description :string;
}
