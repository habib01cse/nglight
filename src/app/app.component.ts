import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,  } from '@angular/forms';
import { DataService } from 'src/app/features/airline/services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hometask';
  
  airlineInfoList: any = [];
  userData: FormGroup;
  constructor( ){
   
  }

  ngOnInit(): void{
    
  }

}
