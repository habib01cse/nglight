import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { DataService } from 'src/app/features/customers/services/data.service';
import { LangService } from "src/app/core/services/lang.service";
import { DateService } from "src/app/shared/utility/date.service";


// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "src/app/shared/_helpers/must-match.validator";
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { ModalServices } from "src/app/features/customers/services/model.services";
import { Customers as cust } from "src/app/features/customers/models/customers";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.html'
})
export class Customers implements OnInit {

  bsConfig?: Partial<BsDatepickerConfig>;    
  colorTheme = globalVariables.bsDatecolorTheme;
  bsDatePickerOp:any; 

  statusNgContainer = false;

  titleArr = [
    { value: 'Mr', text: 'Mr' },
    { value: 'Mrs', text: 'Mrs' },
    { value: 'Miss', text: 'Miss' },
    { value: 'Ms', text: 'Ms' },
      
  ];

  isSkillControlVisible = true;
  skillArr: any[] = [
      { id: 1, name: 'Javascript' },
      { id: 2, name: 'TypeScript' },
      { id: 3, name: 'Angular'},
      { id: 4, name: 'Reactjs' },
      { id: 5, name: 'VueJs' },
      { id: 6, name: 'Rxjs' },
      { id: 7, name: 'Bootstrap' },
      { id: 8, name: 'PhP' },
      { id: 9, name: 'MySql' },
      { id: 10, name: 'Larave' },
      { id: 11, name: 'WordPress' },
      { id: 12, name: '.Net C#', disabled: true },
      { id: 13, name: '.Net MVC Core', disabled: true },
  ];


  itemList:any = [];
  itemListSrc = [
    { ID: 1, TITLE: 'Mr', NAME: 'Cust Name1', DOB: '10/12/2021', EMAIL: 'cust1@gmail.com', GENDER: 'Femail', DESTRUCTION: 'Desc..', SKILL_ID: [1, 2], ACCEPT_TERMS: false},
    { ID: 2, TITLE: 'Mrs', NAME: 'Cust Name2', DOB: '02/12/2021', EMAIL: 'cust2@gmail.com', GENDER: 'Mail', DESTRUCTION: 'Desc.. asd', SKILL_ID: [1, 3, 6], ACCEPT_TERMS: true},
    { ID: 3, TITLE: 'Miss', NAME: 'Cust Name3', DOB: '30/12/2021', EMAIL: 'cust3@gmail.com', GENDER: 'Femail', DESTRUCTION: 'Desc sdf..', SKILL_ID: [1, 5], ACCEPT_TERMS: false},
    { ID: 4, TITLE: 'Mr', NAME: 'Cust Name4', DOB: '12/12/2021', EMAIL: 'cust4@gmail.com', GENDER: 'Mail', DESTRUCTION: 'Desc..', SKILL_ID: [1, 2, 4], ACCEPT_TERMS: true},
   
  ]
  

  constructor(
    public formBuilder: FormBuilder
    , public dtServices: DataService
    , public dts: DateService
    , public model: ModalServices
    ) { }
  ngOnInit(): void {

    console.log('bsConfig', this.bsConfig);
    //this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });

    this.bsDatePickerOp = globalVariables.bsDatePickerOp;

    this.dtServices.setAll(this.itemListSrc);
    this.itemList = this.dtServices.getAll();    
    
  }
  
  onClickAddNew(){
    this.model.customer = new cust(); 
  }

  // convenience getter for easy access to form fields
  get f() { return this.model.customer; }

  onClickSave() {

      console.log('this.model.customer', this.model.customer);
      this.dtServices.save(this.model.customer);
      this.itemList = this.dtServices.getAll();
      console.log('this.itemList', this.itemList);
  }

  onReset() {
      
  }

  itemEdit(itemData){
    console.log('itemData', itemData);
    this.model.customer = new cust(itemData);
  }

  itemDelete(itemData){  
    // use this system use for multipule item delete 
    let itemIds = [];
    itemIds.push(itemData.ID);
    this.itemList = this.dtServices.getAll();
    for(var i = 0; i < this.itemList.length; i++ ){
      let obj = this.itemList[i];
      if( itemIds.indexOf(obj.ID) !== -1 ){
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
