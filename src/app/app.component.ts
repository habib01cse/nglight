import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,  } from '@angular/forms';
import { trigger, state, transition, style, animate, query, group, keyframes } from '@angular/animations';
import { DataService } from 'src/app/features/airline/services/data.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ 
    trigger('routeAnimation', [


      // transition('1 => 2, 2 => 3', [
      //     style({ height: '!' }),
      //     query(':enter', style({ transform: 'translateX(100%)' })),
      //     query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      //     // animate the leave page away
      //     group([
      //         query(':leave', [
      //             animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
      //         ]),
      //         // and now reveal the enter
      //         query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
      //     ]),
      // ]),
      transition('* <=> *', [
        style({ height: '!' }),
        query(':enter', style({ transform: 'translateX(-100%)' }), { optional: true }),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 }), { optional: true } ),
        // animate the leave page away
        group([
          query(':leave', [
            animate('0.3s cubic-bezier(1,1,1,1)', style({
              transform: 'translateX(100%)',
            })),
            // animate(".4s", keyframes([
            //   style({ transform: "rotateY(0deg)", offset: 0 }),
            //   style({ transform: "rotateY(-90deg)", offset: 1 })
            // ]))
          ], { optional: true }),
          // and now reveal the enter
          query(':enter',
            // animate(".3s", keyframes([
            //   // style({ transform: "rotateY(-360deg)", offset: 0 }),
            //   style({ transform: "rotateY(0deg)", offset: 1 })
            // ]))
            animate('0.3s cubic-bezier(1,1,1,1)', style({
              transform: 'rotateX(0)',
            })), { optional: true }

          ),
        ]),
      ]),
      //   transition('2 => 3, 3=>2', [
      //     style({ height: '!' }),
      //     query(':enter', style({ transform: 'translateX(-100%)' })),
      //     query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
      //     // animate the leave page away
      //     group([
      //         query(':leave', [
      //             animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
      //         ]),
      //         // and now reveal the enter
      //         query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
      //     ]),
      // ]),
    ])



  ],
})
export class AppComponent implements OnInit {
  title = 'hometask';
  
  airlineInfoList: any = [];
  userData: FormGroup;
  constructor( private spinner: NgxSpinnerService ){
   
  }

  ngOnInit(): void{
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 300);
  }

  getDepth(outlet) {
    return outlet.activatedRouteData.state;
  }

}
