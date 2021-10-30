import { Component,  ViewChild, ElementRef, OnInit, OnDestroy  } from '@angular/core';
import { DataService } from 'src/app/features/airline/services/data.service';
import { Subscription, of, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from "rxjs/operators";

@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
  airlineInfoList: any = [];
  airlineSubscription!: Subscription;
  keyPressEvnSubscription!: Subscription;

  @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;
  apiResponse: any;

  constructor( public dtService: DataService )
  {
    this.apiResponse = [];
    console.log('const', this.movieSearchInput);          
  }
  ngOnInit(): void{
    this.getAirlineInfoList();

    console.log('init', this.movieSearchInput);
    this.keyPressEvnSubscription = fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(     
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
      // unsubscribe to avoid memory leaks
      this.airlineSubscription.unsubscribe();    
      this.keyPressEvnSubscription.unsubscribe();    
  }

}
