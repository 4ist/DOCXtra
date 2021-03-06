import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { IpcRenderer } from 'electron';
import { Substitution } from './models/substitution';
import { SubstitutionComponent } from './substitution/substitution.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  title = 'DOCXtra';
  substitutions = Array(6);
  private ipc: IpcRenderer;

  fullForm: FormGroup;
  errorMessage: string;

  errors: string[] = [];

  constructor(private formBuilder: FormBuilder) {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('App not running inside Electron!');
    }
  }

  ngOnInit() {
    this.fullForm = this.formBuilder.group({
      source: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      substitutions: this.formBuilder.array([this.initSubstitutionRow()]), //this.createSub()
    });
  }

  initSubstitutionRow(): FormGroup {
    return this.formBuilder.group({
      token: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });
  }

  removeSubstitutionRow(rowIndex: number): void {
    const usersArray = <FormArray>this.fullForm.controls['substitutions'];

    const fakeRowIndex = usersArray.length - 1
    if (usersArray.length > 1) {
      usersArray.removeAt(fakeRowIndex);
    } else {
      this.errorMessage =
        'Unable to delete this row; form must contain at least one row.';
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    }
  }

  addSubstitutionRow(): void {
    const usersArray = <FormArray>this.fullForm.controls['substitutions'];
    usersArray.push(this.initSubstitutionRow());
  }

  logSubs() {
    //console.log(this.substitutions);
    console.log(this.fullForm.controls.substitutions.value);
  }

  submitForm() {
    console.log('-sub-');
    this.errors = [];
    const sourcePath = this.fullForm.controls['source'].value;
    const destinationPath = this.fullForm.controls['destination'].value;

    this.validatePaths(sourcePath, destinationPath);

    const preformattedSubstitutions = this.fullForm.controls['substitutions'].value;
    const substitutions = this.substitutionsArrayToGeneric(preformattedSubstitutions);

    const requestObj = {sourcePath, destinationPath, substitutions};

    if (!this.formIsValid())
      alert(`Unable to submit form, the following errors are present:${this.errors}`);
    else
      this.submitElectronRequest(requestObj)
  }

  validatePaths(sourcePath: string, destinationPath: string) {
    if (sourcePath == '')
    this.errors.push('\nInput path was empty');
  if (destinationPath == '')
    this.errors.push('\nOutput path was empty\n');  }

  formIsValid(): boolean {
    return this.errors.length == 0  
  }

  substitutionsArrayToGeneric(preformattedSubstitutions) {
    var substitutionGeneric = {};
    preformattedSubstitutions.forEach(element => {
      var tempToken = element['token'];
      var tempValue = element['value'];

      if (substitutionGeneric[tempToken] != null)
        this.errors.push(`\nToken ${tempToken} is used multiple times`);
      else
      substitutionGeneric[tempToken] = tempValue;
    });
  }

  submitElectronRequest(requestObj: any) {
    if ((<any>window).require) {
      try {
        this.ipc.send('createDocument', requestObj)
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Request not sent; app not running inside Electron');
    }  }


}
