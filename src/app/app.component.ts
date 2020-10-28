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
      token: ['valueFromParent', [Validators.required]],
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

  addSub() {
    this.substitutions.push(0);
  }

  removeSub() {
    this.substitutions.pop();
  }

  createDocument() {
    console.log('-CreateDocument-');
    console.log(this.fullForm);
  }
  openModal() {
    console.log('Open a modal');
    this.ipc.send('openModal');
  }

  ChangeThis(fg: FormGroup){
    fg['token'] += '@';
  }

}
