import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,  } from '@angular/forms';
import { DataService } from 'src/app/features/users/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  airlineInfoList: any = [];
  userData: FormGroup;
  constructor(
    public formBuilder: FormBuilder
    , public dtService: DataService,
    ){
    
  }

  ngOnInit(): void{    
    this.setValidtion();
  }

  addNew(){
    this.setDefaultValue();    
  }

  setDefaultValue(){
    this.userData = this.formBuilder.group({
      DepartureAirportCode: new FormControl(),
      ArrivalAirportCode: new FormControl(),
      DepartureDate: new FormControl(),
      ReturnDate: new FormControl()
    });
  }

  setValidtion(){
    const validPattern = "^[a-zA-Z0-9]{10}$";
    this.userData = this.formBuilder.group({
      DepartureAirportCode:  ['',[ Validators.maxLength(3), Validators.pattern(validPattern)]],
      ArrivalAirportCode: ['', [Validators.maxLength(3), , Validators.pattern(validPattern)]],
      DepartureDate: new FormControl(),
      ReturnDate: new FormControl()
    });
  }

  // Only AlphaNumeric
  keyPressAlphanumeric(event) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }

  }


  postDate(){   
    this.dtService.create(this.userData.value).subscribe(res =>{
      console.log('res', res);
    })

  }

}
