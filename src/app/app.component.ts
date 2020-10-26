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
  substitutions = Array(6);
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

  logSubs(){
    console.log(this.substitutions);
  }

  addSub(){
    this.substitutions.push(0);
  }

  removeSub(){
    this.substitutions.pop();
  }

  createDocument(){
    var x = document.getElementById('substitutionContainer');
    x.childNodes.forEach(div => {
      console.log(div.firstChild.firstChild)
      console.log(div.firstChild.firstChild.childNodes)
      console.log(div.firstChild.firstChild)
    });
    //console.log(x.childNodes);
  }
  openModal(){
    console.log("Open a modal");
    this.ipc.send("openModal");
  }

}
