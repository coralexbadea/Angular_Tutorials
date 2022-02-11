import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  //customer = new Customer();
  messages = {}
  radio : string = ""

  private validationMessages: any = { //edit here
    name:{
      required: 'Please enter your name.'
    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({//edit here
      organisation:'new',
      name:['', [Validators.required]],
      type:'default',
      agbCode:['', [Validators.required]],
      streetName:['', [Validators.required]],
      houseNumber:['', [Validators.required]],
      houseNumberAdditional:['', [Validators.required]],
      postalCode:['', [Validators.required]],

    })

    Object.keys(this.customerForm.controls).filter(key=>this.customerForm.controls[key].validator)
    .forEach(key => {
      this.messages[key] = ''
      this.customerForm.controls[key].valueChanges.pipe(
        debounceTime(1000)
      ).subscribe(
        value => this.setMessage(this.customerForm.controls[key], key)
      )
    });
    // const emailControl = this.customerForm.get('email');
    // emailControl?.valueChanges.pipe(
    //   debounceTime(1000)
    // ).subscribe(
    //   value => this.setMessage(emailControl)
    // );
  }

  setMessage(c: AbstractControl, key: string): void {
    this.messages = {}
    if ((c.touched || c.dirty) && c.errors) {
      this.messages[key] = Object.keys(c.errors).map(
        keyErrors => this.validationMessages[key][keyErrors]).join(' ');
    }
  }
  
  onSubmit(){

  }

}
