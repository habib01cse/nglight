import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LangService } from "src/app/core/services/lang.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from '../services/services/data.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services:any = [];
  modalRef?: BsModalRef;

  formData: FormGroup;
  constructor(
    public formBuilder: FormBuilder
    , public dtServices: DataService
  , private modalService: BsModalService
    ) { }
  ngOnInit(): void {
    this.dtServices.setAll();
    this.services = this.dtServices.getAll();
    this.formInit();    
  }
  formInit(){
    this.setValidtion();
  }
  setDefaultValue(){
    this.formData = this.formBuilder.group({
      name: new FormControl(),
      cat: new FormControl(),
      charce: new FormControl()      
    });
  }
  setValidtion(){
    //const validPattern = "^[a-zA-Z0-9]{10}$";
    //Validators.pattern(validPattern)]
    this.formData = this.formBuilder.group({
      name:  ['', [ Validators.maxLength(3)]],
      cat: ['', [Validators.maxLength(3)]],
      charge: new FormControl(),
    });
  }

  postDate(){     
    console.log('this.formData.value', this.formData.value); 
    console.log('this.formData', this.formData); 

    this.dtServices.create(this.formData.value);
  }





  openModalAdd(template: TemplateRef<any>) {  
    console.log('template', template);

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  openModalEditServices(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }


  trackByFn(index, item) {
		return index; // or item.id
	}

}
