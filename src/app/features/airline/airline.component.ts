import { Component,  ViewChild, ElementRef, OnInit, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/features/airline/services/data.service';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from "rxjs/operators";
import { LangService } from "src/app/core/services/lang.service";

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit, OnDestroy {
  userData: FormGroup;

  airlineInfoList: any = [];
  airlineSubscription!: Subscription;
  keyPressEvnSubscription!: Subscription;

  @ViewChild('itemSearchInput', { static: true }) itemSearchInput: ElementRef;
  apiResponse: any;

  constructor( 
    public dtService: DataService
    , public formBuilder: FormBuilder
    , public langService: LangService  )
  {
    this.apiResponse = [];
    console.log('const', this.itemSearchInput);          
  }
  ngOnInit(): void{
    // this.langService.langData.action
    this.getAirlineInfoList();

    console.log('init', this.itemSearchInput);
    this.keyPressEvnSubscription = fromEvent(this.itemSearchInput.nativeElement, 'keyup').pipe(     
      // get value
      map((event: any) => {       
        return event.target.value;
      })
      // if character length greater then 2
      //, filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(300)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((searchTerm: string) => {          
      this.search(searchTerm)
    });  
    
    this.formInit();
  }
  search(term){    
    if(term){      
      this.airlineInfoList = this.airlineInfoList.filter(el => 
        el.AirlineName.toLocaleLowerCase().includes(term.toLocaleLowerCase())
        || el.InboundFlightsDuration.toLocaleLowerCase().includes(term.toLocaleLowerCase()) 
        || el.OutboundFlightsDuration.toLocaleLowerCase().includes(term.toLocaleLowerCase())        
        );     
    }else{
      this.getAirlineInfoList();
    }   
  }
  getAirlineInfoList(){
    this.airlineSubscription = this.dtService.getAll().subscribe(res =>{
      this.airlineInfoList = res;
    });
  } 
  trackByFn(index, item) {
		return index; // or item.id
	}
  ngOnDestroy() {      
    this.airlineSubscription.unsubscribe();    
    this.keyPressEvnSubscription.unsubscribe();    
  }

  formInit(){
    this.setValidtion();
  }

  addNew(){
    this.setValidtion();
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
