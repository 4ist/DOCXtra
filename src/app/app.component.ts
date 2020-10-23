import { Component } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Substitution } from './models/substitution';
import { SubstitutionComponent } from './substitution/substitution.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DOCXtra';
  substitutions = 1;//new Substitution();

  private ipc: IpcRenderer
  constructor(){
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

  openModal(){
    console.log("Open a modal");
    this.ipc.send("openModal");
  }
}