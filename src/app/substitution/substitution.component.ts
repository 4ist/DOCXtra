import { Component, OnInit, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  ControlContainer,
} from '@angular/forms';

@Component({
  selector: 'app-substitution',
  templateUrl: './substitution.component.html',
  styleUrls: ['./substitution.component.scss']
})
export class SubstitutionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {}

  // passing in the formgroup from the parent
  @Input() substitutionFormGroup: FormGroup;

  logFormGroup(){
    console.log('paremeter group: ', this.substitutionFormGroup)
  }

  ngOnInit() {

    console.log('sub form group: ', this.substitutionFormGroup)

    // Even though I'm setting substitutionFormGroup to new values,
    // the parent's substitutionFormGroup is not updated. Perhaps
    // a copy is being made instead of passing in the actual object?
    this.substitutionFormGroup = this.formBuilder.group({
      'token' :'internally assigned value', // token: new FormControl('', Validators.required),
      'value' : ''}
      );

    console.log('sub form groupdddddddddddddd: ', this.substitutionFormGroup)

  }
}
