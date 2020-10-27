import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SubstitutionComponent),
  multi: true
};

@Component({
  selector: 'app-substitution',
  templateUrl: './substitution.component.html',
  styleUrls: ['./substitution.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class SubstitutionComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input() subFormss: number;

  @Input() token: string;
  @Input() value: string;

  substitutionFormGroup: FormGroup;
  ngOnInit() {
    this.substitutionFormGroup = this.formBuilder.group({
      token: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }

}
