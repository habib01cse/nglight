import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/features/users/services/data.service';
import { LangService } from "src/app/core/services/lang.service";

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
    , public langService: LangService
    , public dtService: DataService,
    ){
    
  }

  ngOnInit(): void{    
    //this.setValidtion();
  }

  

}
