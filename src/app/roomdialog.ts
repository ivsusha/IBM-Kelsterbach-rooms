import { Component, Input, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { DateTimePickerModule } from 'ng-pick-datetime';
import * as format from 'date-fns/format';
import { RoomsService } from './getRoomsService';
export interface RoomModel {
  title: string,
  message: string,
  startAt: Date,
  endAt: Date,
  room_abbr: string,
  number: string,
  block: string,
  isM: string,
  descr: string,
  corridor: string, floor: string, roomId: string
  // roomArray:  {geb: string, descr: string, x: string, y: string} ;
}
@Component({
  selector: 'roominfo',
  styles: ['owl-datetime{height:2.5em;}'],
  template:
    `<div class="modal-dialog" style="overflow-y: initial !important">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" (click)="close()">&times;</button>
        <h4 class="modal-title hidden-xs">Meeting room</h4>
        <div class="form-group hidden-sm hidden-md hidden-lg">
        <label for="room_abbr" class="col-xs-2"></label>
        <div class="col-xs-7">
        <p class="form-control-static" id="room_abbr" style="color:blue;font-weight: bold">{{room_abbr}}</p>
        <!--
        <label for="room_abbr" class="col-xs-2">Room </label>
          <input type="text" name="room_abbr" id="room_abbr" class="form-control-static" value="" [(ngModel)]=room_abbr>
          -->
        </div>
      </div>
      </div>
      <div class="modal-body">    
        <div class="container-fluid">
        
          <form class="form-horizontal">

            <div class="row hidden-xs  hidden-sm hidden-md hidden-lg">
              <div class=" col-xs-12 hidden-xs">
                <img src="images/DSC04337.JPG" class="img-responsive" alt="meeting room" style="width:20%;height:20%;"><br>
              </div>
            </div>
            <div class="row">
  
              <div class="form-group  hidden-xs">
                <label for="build" class="col-sm-2">Block </label>
                <div class="col-xs-12 col-sm-9">
                  <input type="text" name="build" id="build" class="form-control" value="51" [(ngModel)]=block>
                </div>
              </div>
  
              <div class="form-group  hidden-xs">
                <label for="etage" class="col-sm-2">Floor </label>
                <div class="col-sm-9">
                  <input type="text" name="etage" id="etage" class="form-control" value="" [(ngModel)]=floor>
                </div>
              </div>
  
              <div class="form-group  hidden-xs">
                <label for="fl" class="col-sm-2">Corridor </label>
                <div class="col-sm-9">
                  <input type="text" name="fl" id="fl" class="form-control" value="" [(ngModel)]=corridor>
                </div>
              </div>
  
              <div class="form-group  hidden-xs">
                <label for="number" class="col-sm-2">Room </label>
                <div class="col-xs-12 col-sm-9">
                  <input type="text" name="number" id="number" class="form-control" value="" [(ngModel)]=number>
                </div>
              </div>
              <div class="form-group" *ngIf="isNotMeeting()">
              <label for="user" class="col-xs-2">User </label>
              <div class="col-xs-10 col-sm-9">
                <input type="text" name="user" id="user" class="form-control" value="" [(ngModel)]=username  placeholder="Enter your name">
              </div>
            </div>
              
  
              <div class="form-group" *ngIf="isNotMeeting()">
  
                <div class="input-control">
                  <label for="input1" class="col-xs-2">From </label>
                  <div class="col-xs-10 col-sm-9">
                    <owl-date-time [showButtons]="true" [(ngModel)]=startAt name="startAt" [dateFormat]="'DD.MM.YYYY HH:mm'" [placeHolder]="'DD.MM.YYYY hh:mm'" [min]="min"
                      [max]="max" [inputId]="'input1'"></owl-date-time>
                  </div>
                </div>
              </div>
  
              <div class="form-group" *ngIf="isNotMeeting()">
                <div class="input-control">
                  <label for="input2" class="col-xs-2">To </label>
                  <div class="col-xs-10 col-sm-9">
                    <owl-date-time  [showButtons]="true" [(ngModel)]=endAt name="mom2" [dateFormat]="'DD.MM.YYYY HH:mm'" [placeHolder]="'DD.MM.YYYY hh:mm'" [min]="min"
                      [max]="max" [inputId]="'input2'"></owl-date-time>
                  </div>
                </div>
              </div>
  
              <div class="form-group">
                <label for="descr" class="col-xs-2">Info </label>
                <div class="col-xs-10 col-sm-9">
                  <textarea name="descr" id="descr" class="form-control" value="" [(ngModel)]=descr rows="2"></textarea>
                </div>
              </div>
  
              <div>
                <input type="hidden" name="hidden" id="hidden" class="form-control" value="" [(ngModel)]=roomId>
              </div>
            </div>
      
  
        </form>
      </div>
    </div>
    <div class="modal-footer">
    <div class="btn-group" *ngIf="isNotMeeting()">
    <button type="button" class="btn btn-warning dropdown-toggle" data-toggle="dropdown" (click)="getReservedTime(toggle)">
    Occupied time <span class="caret" ></span></button>
    <ul class="dropdown-menu" role="menu" style="width:300px;">
    <li *ngFor="let entry of roomReservedT"  class="list-group-item"><span>
    {{entry.time}}</span></li> 
    </ul>
  </div>    
  
      <button type="button" [disabled]="!isValid()" class="btn btn-primary" (click)="confirm()" *ngIf="isNotMeeting()">Reserve</button>
      <button type="button" class="btn btn-default" (click)="close()">Cancel</button>
    </div>
  </div>
  </div>`
})
export class RoomDetailsComponent extends DialogComponent<RoomModel, boolean> implements RoomModel {

  roomReservedT: { time: string }[] = [];
  toggle:boolean = false;
  username = this.roomService.GetCurrentUser();
  public min = new Date();
  public max = new Date();
  startAt: Date;
  endAt: Date;
  title: string;
  roomId: string;
  message: string;
  geb = "51";
  room_abbr: string;
  isM: string;
  descr: string;
  build = "";
  number: string;
  block: string;
  corridor: string; floor: string;
  etage = undefined;
  fl = undefined;
  raum = "";
  input1Moment = new Date(this.startAt);
  input2Moment = new Date(this.endAt);
  mEvent: { "resourceUniversalId": string, "startsAt": string, "endsAt": string, "user": string } =
    { "resourceUniversalId": "", "startsAt": "", "endsAt": "", "user": "" };
  roomEvent: { resourceUniversalId: string } = { resourceUniversalId: "" };

  constructor(dialogService: DialogService, private roomService: RoomsService) {
    super(dialogService);
    this.max.setDate(this.max.getDate() + 1);
  }

  // tslint:disable-next-line:one-line
  isValid(): boolean {
    if (this.startAt < this.endAt) return true;
    else return false;
  }
  isNotMeeting(){ 
    if(this.isM =="1") return false;
    else return true;
  }
  
  getReservedTime(toggle) {
    this.toggle = !this.toggle;
   // if (this.toggle == false) return;
    let extdb = this.roomService.GetQuietRoomDbPath();
    if (this.roomId == "" || this.roomId == undefined) { alert("This room is unavailable for the reservation."); return; }
    this.roomEvent.resourceUniversalId = this.roomId;
    this.roomService.getReservedTime(this.roomEvent, extdb).subscribe(
      (response: Response) => {
        this.roomReservedT = response.json();
      }
      ,
      (error) => { alert("Error"); }
    );

  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code 
    this.input1Moment = new Date(this.startAt);
    let d1 = format(
      this.input1Moment,
      'DD.MM.YYYY HH:mm ZZ'
    )

    this.mEvent.startsAt = d1;

    this.input2Moment = new Date(this.endAt);
    let d2 = format(
      this.input2Moment,
      'DD.MM.YYYY HH:mm ZZ'
    )
    this.mEvent.endsAt = d2;
    this.mEvent.resourceUniversalId = this.roomId;
    this.mEvent.user = this.username;
    this.roomService.reserve(this.mEvent).subscribe(
      (response: Response) => {
        if (response.text().indexOf("unavailable") >= 0) {
          alert("Sorry but this period is not available, try to choose another one")
        }
        else {        
           alert("The room " + this.room_abbr.substring(10) + " was reserved from " + this.mEvent.startsAt.substring(0,17) + " till " + this.mEvent.endsAt.substring(0,17)) };
        this.result = true;
      },
      (error) => { alert("Wrong parameters"); this.result = false; }
    );

    this.close();
  }
}
