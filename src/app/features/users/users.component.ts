import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { DataService } from 'src/app/features/users/services/data.service';
import { LangService } from "src/app/core/services/lang.service";
import { DateService } from "src/app/shared/utility/date.service";


// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "src/app/shared/_helpers/must-match.validator";
import { globalVariables } from 'src/app/core/constants/globalVariables';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  bsConfig?: Partial<BsDatepickerConfig>;    
  colorTheme = globalVariables.bsDatecolorTheme;
  bsDatePickerOp:any; 

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
    {id: 1, title: 'Mr', firstName: 'Md.', lastName: 'User 1', dob: '',  email: 'user1@gmail.com', password: '', gender: 'Mail', description: 'Desc..', selectedSkillds: [1, 2],  acceptTerms: true},
    {id: 2, title: 'Ms', firstName: 'Kh.', lastName: 'User 2', dob: '',  email: 'user2@gmail.com', password: '', gender: 'Femail', description: 'Test..', selectedSkillds: [1, 5, 2], acceptTerms: false},
    {id: 3, title: 'Mr', firstName: 'Md.', lastName: 'User 3', dob: '',  email: 'user3@gmail.com', password: '', gender: 'Mail', description: 'Ok..', selectedSkillds: [1, 3, 6, 9], acceptTerms: true},
    {id: 4, title: 'Ms', firstName: 'Kh.', lastName: 'User 4', dob: '',  email: 'user4@gmail.com', password: '', gender: 'Femail', description: 'Check..', selectedSkillds: [1, 7, 8, 10], acceptTerms: false}
  ]
  formData: FormGroup;
  registerForm: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder
    , public dtServices: DataService
    , public dts: DateService
  
    ) { }
  ngOnInit(): void {

    console.log('bsConfig', this.bsConfig);
    //this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });

    this.bsDatePickerOp = globalVariables.bsDatePickerOp;

    this.dtServices.setAll(this.itemListSrc);
    this.itemList = this.dtServices.getAll();    
    this.formInit();    
  }
  formInit(){
    this.setValidtion();
  }
  setValidtion(){
    // Reference
    //const validPattern = "^[a-zA-Z0-9]{10}$";
    //Validators.pattern(validPattern)]
    this.registerForm = this.formBuilder.group({
      id: new FormControl(),
      title: ['Mr', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // validates date format yyyy-mm-dd
      //dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['Mail', Validators.required],
      description: [''],
      selectedSkillds: [],
      acceptTerms: [false, Validators.requiredTrue]
    },{
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    console.log('this.registerForm.value', this.registerForm.value);

      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }


      // display form values on success
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
      this.dtServices.save(this.registerForm.value);
      this.itemList = this.dtServices.getAll();
      console.log('this.itemList', this.itemList);
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  itemEdit(itemData){
    console.log('itemData', itemData);

    this.registerForm.patchValue({
      id: itemData.id,
      firstName: itemData.firstName,
      lastName: itemData.lastName,
      dob: itemData.dob,
      email: itemData.email,
      title: itemData.title,
      description: itemData.description,
      gender: itemData.gender,
      selectedSkillds: itemData.selectedSkillds,
      acceptTerms: itemData.acceptTerms
    });

    // this.registerForm = this.formBuilder.group({
    //   id: [itemData.id],
    //   title: [itemData.title],
    //   firstName: [itemData.firstName],
    //   lastName: [itemData.lastName],
    //   // validates date format yyyy-mm-dd
    //   dob: [itemData.dob],
    //   email: [itemData.email],
    //   password: [itemData.password],
    //   confirmPassword: [itemData.password],
    //   gender: [itemData.gender],
    //   acceptTerms: [itemData.acceptTerms]
    // });
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
