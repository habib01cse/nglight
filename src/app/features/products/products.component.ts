import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LangService } from "src/app/core/services/lang.service";
import { DataService } from '../products/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  itemList:any = [];
  itemListSrc = [
    {id: 1, name: 'Product 1', cat: 'Cat 1', price: 500},
    {id: 2, name: 'Product 2', cat: 'Cat 2', price: 400},
    {id: 3, name: 'Product 3', cat: 'Cat 3', price: 300},
    {id: 4, name: 'Product 4', cat: 'Cat 4', price: 200}
  ]
  formData: FormGroup;
  constructor(
    public formBuilder: FormBuilder
    , public dtServices: DataService
  
    ) { }
  ngOnInit(): void {
    this.dtServices.setAll(this.itemListSrc);
    this.itemList = this.dtServices.getAll();
    console.log(' this.itemList',  this.itemList);
    this.formInit();    
  }
  formInit(){
    this.setValidtion();
  }
  setDefaultValue(){
    this.formData = this.formBuilder.group({
      name: new FormControl(),
      cat: new FormControl(),
      price: new FormControl()      
    });
  }
  setValidtion(){
    //const validPattern = "^[a-zA-Z0-9]{10}$";
    //Validators.pattern(validPattern)]
    this.formData = this.formBuilder.group({
      id: new FormControl(),
      name:  ['', [ Validators.maxLength(3)]],
      cat: ['', [Validators.maxLength(3)]],
      price: new FormControl(),
    });
  }

  postDate(){     
    this.dtServices.create(this.formData.value);
    this.itemList = this.dtServices.getAll();
    console.log('this.itemList', this.itemList);
  }

  itemEdit(itemData){
    this.formData.patchValue({
      id: itemData.id,
      name: itemData.name,
      cat: itemData.cat,
      price: itemData.price
    });
  }

  itemDelete(itemData){  
    // use this system use for multipule item delete 
    let itemIds = [];
    itemIds.push(itemData.id);
    this.itemList = this.dtServices.getAll();
    for(var i = 0; i < this.itemList.length; i++ ){
      let obj = this.itemList[i];
      if( itemIds.indexOf(obj.id) !== -1 ){
        this.itemList.splice(i, 1);
        this.dtServices.setAll(this.itemList);
        break;
      }
    }    
  }

  trackByFn(index, item) {
		return index; // or item.id
	}

}
