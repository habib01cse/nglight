import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/features/users/services/data.service';
import { LangService } from "src/app/core/services/lang.service";

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "src/app/shared/_helpers/must-match.validator";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  itemList:any = [];
  itemListSrc = [
    {id: 1, title: 'Mr.', firstName: 'Md.', lastName: 'User 1', dob: '',  email: 'user1@gmail.com', password: '', acceptTerm: true},
    {id: 2, title: 'Mr.', firstName: 'Md.', lastName: 'User 2', dob: '',  email: 'user2@gmail.com', password: '', acceptTerm: true},
    {id: 3, title: 'Mr.', firstName: 'Md.', lastName: 'User 3', dob: '',  email: 'user3@gmail.com', password: '', acceptTerm: true},
    {id: 4, title: 'Mr.', firstName: 'Md.', lastName: 'User 4', dob: '',  email: 'user4@gmail.com', password: '', acceptTerm: true}
  ]
  formData: FormGroup;
  registerForm: FormGroup;
  submitted = false;

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
  setValidtion(){
    // Reference
    //const validPattern = "^[a-zA-Z0-9]{10}$";
    //Validators.pattern(validPattern)]
    this.registerForm = this.formBuilder.group({
      id: new FormControl(),
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // validates date format yyyy-mm-dd
      dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    },{
        validator: MustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
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
    this.registerForm.patchValue({
      id: itemData.id,
      firstName: itemData.firstName,
      lastName: itemData.lastName,
      email: itemData.email,
      title: itemData.title
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
