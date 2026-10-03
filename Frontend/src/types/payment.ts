export interface Payment{_id:string;amount:number;currency:string;paymentStatus:"Pending"|"Success"|"Failed"|"Refunded";transactionId?:string;}
