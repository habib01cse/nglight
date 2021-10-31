import { Component,  ViewChild, ElementRef, OnInit, OnDestroy  } from '@angular/core';
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
  airlineInfoList: any = [];
  airlineSubscription!: Subscription;
  keyPressEvnSubscription!: Subscription;

  @ViewChild('itemSearchInput', { static: true }) itemSearchInput: ElementRef;
  apiResponse: any;

  constructor( 
    public dtService: DataService
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

}
