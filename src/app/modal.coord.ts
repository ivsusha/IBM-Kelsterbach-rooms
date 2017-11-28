import { RoomsService } from './getRoomsService';
import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
export interface ConfirmModel {
  title: string;
  message: string;
  position: string;
  xPos: string;
  yPos: string;  
  geb: string;
  degree:string;
  descr: string;
 // roomArray:  {geb: string, descr: string, x: string, y: string} ;
}
@Component({
    selector: 'confirm',
    template:
    `<div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-header">
                 <button type="button" class="close" (click)="close()" >&times;</button>
                 <h4 class="modal-title">Enter values</h4>
               </div>
               <div class="modal-body">
                 <div class="container-fluid">
                 <div class="row">
                   <div class="col-xs-12">

                        <div class="form-group">
                        <label for="build">Gebäude/Raum </label>
                          <input type="text" name="build" id="build" class="form-control" value=""
                          [(ngModel)] = geb required
                          pattern="" title="">
                        </div>
                  

                        <div class="form-group">
                        <label>Position </label>
                        <label class="radio-inline"><input type="radio" name="optradio" value = "left" id="r1" [(ngModel)] = position>Left-bottom</label>
                        <label class="radio-inline"><input type="radio" name="optradio" value = "top" id="r2" [(ngModel)] = position>Top-right </label>
                        </div>

                        <div class="form-group" *ngIf = "(position=='top')" >
                          <label>Winkel (grad) </label>
                          <input type="text" name="rotate" id="build" class="form-control" value=""
                          [(ngModel)] = degree>
                        </div>

                        <div *ngIf = "(position=='top')"  class="form-group">
                        <label for="descr">Description </label>
                          <input type="text" name="descr" id="descr" class="form-control" value=""
                          [(ngModel)] = descr
                          pattern="" title="">
                        </div>
                   

                 </div>
               </div>
               </div>
               <div class="modal-footer">
                 <button type="button"[disabled]="!isValid()" class="btn btn-primary" (click)="confirm()">OK</button>
                 <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
               </div>
             </div>
          </div>`
})
export class AddRoomCoord extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

  title: string;
  message: string;
  xPos: string;
  yPos: string;
  position :string;
  degree: string;
  geb: string;
  descr: string; 
  constructor(dialogService: DialogService, private rooms: RoomsService) {
    super(dialogService);
  }

// tslint:disable-next-line:one-line
isValid():boolean{
 // this.position = this.position1 =="0"  ? this.position2 : this.position1;
 if(this.position == undefined || this.position =="" ) return false;
else return true;

}

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code    
    const roomArray:  {geb: string, position: string, x: string, y: string, descr: string, grad: string }  = {geb: this.geb,
       position: this.position, x: this.xPos, y: this.yPos,descr: this.descr, grad: this.degree};
      // Geb_51_E1_2.0.013   Geb.51 Etage 1 Flügel 2 Raum 13
      
    this.rooms.setCoord(roomArray).subscribe(
      (response: Response) => {
        console.log(response);
      //  this.roomArray: {geb: string, descr: string}[] = response.json();
       // this.viewEntryArray = this.getView(viewArray);

   },
    (error) => {console.log(error); this.result = false; }
  );
    this.result = true;
    this.close();
  }
}
