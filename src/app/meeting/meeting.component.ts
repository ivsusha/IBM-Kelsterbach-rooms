
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { RoomDetailsComponent } from '../roomdialog';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {  
  @Input() Xleft:string;
  @Input() Yleft:string;
  @Input() Width:string;
  @Input() Height:string;
  @Input() Visible:string;
  @Input() Room:string; 
  @Input() IsFree:string;
  @Input() Grad:string;
  @Input() StartAt:string;
  @Input() EndAt:string;
  @Input() Descr:string;
  @Input() RoomId:string;
  rnum : string;
  block:string;
  floor:string;
  corridor:string;
  
  constructor(private dialogService: DialogService) { }

  ngOnInit() {
   // Geb_51_E3_1.3.002
    let len = this.Room.length;
    this.rnum = this.Room.substr(len-3);
    this.floor= this.Room.substr(7,2);
    this.corridor= this.Room.substr(10,1);
    this.block= this.Room.substr(4,2);
  }
  setBackground(IsFree){
    if(IsFree == 'free') return 'green'
    else return 'rgb(172, 208, 238)';
  }
   setDegree(Grad){
     if(this.Grad=="" || this.Grad == undefined) return ""
     else{
       const v = "rotate(" + this.Grad+"deg)";
      return v;
     }
   }
 convertDate(dat:string):Date{
 // let d1 = format(dat,'DD.MM.YYYY HH:mm ZZ');
 //13.12.2017 15:00  new Date(year, month, day, hours, minutes, seconds, milliseconds)
 // let d1 = format(dat, 'DD.MM.YYYY HH:mm');
 if(dat=="" || dat== undefined) return new Date();
  let year = parseInt(dat.substr(6,4));
  let month = parseInt(dat.substr(3,2))-1;
  let day = parseInt(dat.substr(0,2));
  let hours = parseInt(dat.substr(11,2));
  let minutes = parseInt(dat.substr(14,2));
    return new Date(year, month, day, hours, minutes);
 }
  onRoomDetails(){
   
    let disposable = this.dialogService.addDialog(RoomDetailsComponent, {     
      title: 'Enter values',
      message: "Room info",  
      startAt:this.convertDate(this.StartAt),
      endAt:this.convertDate(this.EndAt) ,
      room_abbr: this.Room,
      number: this.rnum ,     
      block: this.block,
      floor: this.floor,
      corridor: this.corridor ,
      descr:this.Descr,
      roomId: this.RoomId          
      }).subscribe((isConfirmed) => {
      // We get dialog result
      if (isConfirmed) {
        this.setBackground("");
      }
      else {
  //        alert('Canceled');
      }
  });
}
}
