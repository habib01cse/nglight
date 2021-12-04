import { Injectable } from '@angular/core';
import { WebStorageService } from 'src/app/core/services/web-storage.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  servicesKey = "USERS";

  constructor( 
    private webStorageService: WebStorageService
    ) {}
  setAll(itemList){
    console.log('servicesKey', this.servicesKey);
    this.webStorageService.setItem(this.servicesKey, itemList);
  }
  getAll():any {
    return this.webStorageService.getItem(this.servicesKey);
  }
  save(data){
    let getAllItem = this.webStorageService.getItem(this.servicesKey); 
    if(data.id){

      for( var i = 0; i < getAllItem.length; i++ ){
        let obj = getAllItem[i];
        if(data.id == obj.id){
          obj['firstName'] = data.name;
          obj['lastName'] = data.cat;
          obj['email'] = data.price; 
          getAllItem[i] = obj;      
        }
      }
      
    }else{
      data['id'] = Math.floor(Math.random() * 1000000);
      getAllItem.push(data);    
    }
    
    this.webStorageService.setItem(this.servicesKey, getAllItem);

  }


}
