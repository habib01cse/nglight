import { Injectable } from "@angular/core";
import { Customers } from "src/app/features/customers/models/customers";


@Injectable({
    providedIn: 'root'
})

export class ModalServices{
    public customer: Customers;
    public customers = new Array<Customers>();

    constructor(){
        this.customer = new Customers();
    }
}