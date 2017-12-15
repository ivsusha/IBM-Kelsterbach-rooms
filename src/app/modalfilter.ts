import { Component, Input } from '@angular/core';
import { Response } from '@angular/http';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as format from 'date-fns/format';
export interface MeetingModel {
  title: string;
  message: string;  
 
  geb: string;
  descr: string;
 
 // roomArray:  {geb: string, descr: string, x: string, y: string} ;
}
@Component({
    selector: 'selmeeting',
    styles: ['owl-datetime{height:2.5em;}'],
    template:
    `<div class="modal-dialog">
    <div class="modal-content">
       <div class="modal-header">
         <button type="button" class="close" (click)="close()" >&times;</button>
         <h4 class="modal-title">Enter values</h4>
       </div>
       <div class="modal-body">
         <div class="container-fluid">
            <form class="form-horizontal">
         <div class="row">
            <div class="form-group">
                <label for="geb" class="col-xs-2">Block </label>
                <div class="col-xs-10 col-sm-9">
                  <input type="text" name="build" id="build" class="form-control" value="51" [(ngModel)]=geb>
                </div>
              </div>

           <div class="form-group">
                <label for="etage" class="col-xs-2">Floor </label>
                <div class="col-xs-10 col-sm-9">
                  <input type="text" name="etage" id="etage" class="form-control" value="" [(ngModel)]=etage  placeholder="0,1,2..U1,U2">
                </div>
            </div>

          
            <div class="form-group">
                <label for="fl" class="col-xs-2">Corridor </label>
                <div class="col-xs-10 col-sm-9">
                  <input type="text" name="fl" id="fl" class="form-control" value="" [(ngModel)]=fl  placeholder="1,2,3...">
                </div>
              </div>
           
              <div class="form-group">
                  
                                <div class="input-control">
                                  <label for="input1" class="col-xs-2">From </label>
                                  <div class="col-xs-10 col-sm-9">
                                    <owl-date-time [(ngModel)]=input1Moment name="mom1" [dateFormat]="'DD.MM.YYYY HH:mm'" [placeHolder]="'DD.MM.YYYY hh:mm'" [min]="min"
                                      [max]="max" [inputId]="'input1'"></owl-date-time>
                                  </div>
                                </div>
                              </div>

                              <div class="form-group">
                                  <div class="input-control">
                                    <label for="input2" class="col-xs-2">To </label>
                                    <div class="col-xs-10 col-sm-9">
                                      <owl-date-time [(ngModel)]=input2Moment name="mom2" [dateFormat]="'DD.MM.YYYY HH:mm'" [placeHolder]="'DD.MM.YYYY hh:mm'" [min]="min"
                                        [max]="max" [inputId]="'input2'"></owl-date-time>
                                    </div>
                                  </div>
                                </div>
         </div>
        </form>
       </div>
       </div>
       <div class="modal-footer">
         <button type="button"[disabled]="!isValid()" class="btn btn-primary" (click)="confirm()">OK</button>
         <button type="button" class="btn btn-default" (click)="close()" >Cancel</button>
       </div>
     </div>
  </div>`
})
export class SelectMeetingComponent extends DialogComponent<MeetingModel, {startsAt:string,endsAt:string,block:string,floor:string,corridor:string}> implements MeetingModel {
  public min = new Date();
 
  public max = new Date(); 
 
  
  title: string;
  message: string; 
  geb = "51";
  descr: string;
  build="";
  etage= undefined;
  fl= undefined;
  raum=""; 
  input1Moment  = new Date();
  input2Moment = new Date();
  mEvent : {startsAt:string,endsAt:string,block:string,floor:string,corridor:string}=
  {startsAt:"",endsAt:"",block:"",floor:undefined,corridor:undefined};
  constructor(dialogService: DialogService) {
    super(dialogService);
    this.max.setDate(this.max.getDate()+1);
  }

// tslint:disable-next-line:one-line
isValid():boolean{
 if(this.input1Moment < this.input2Moment) return true;
 else return false;
}

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code 
 
    let d1 = format(
      this.input1Moment,
      'DD.MM.YYYY HH:mm ZZ'
    )
   
    this.mEvent.startsAt = d1;
    let d2 = format(
      this.input2Moment,
      'DD.MM.YYYY HH:mm ZZ'
    )
    this.mEvent.endsAt = d2;
    this.mEvent.block = this.geb;
    this.mEvent.floor = this.etage;
    this.mEvent.corridor = this.fl;
   
 //   this.rooms.setRoom(roomArray).subscribe(
 //     (response: Response) => {
  //      console.log(response);
   

 //  },
 //   (error) => {console.log(error); this.result = false; }
//  );

    this.result = this.mEvent;
    this.close();
  }
}
