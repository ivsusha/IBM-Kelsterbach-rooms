
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
  @Input() IsM:string;
  rnum : string;
  block:string;
  floor:string;
  corridor:string;
  date:Date;
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
   // if(IsFree == 'free') return 'green'
  //  else if(this.IsM == "1")return 'rgb(23, 116, 193)'
  //  else return 'rgb(172, 208, 238)';
  }
   setDegree(Grad){
     if(this.Grad=="" || this.Grad == undefined) return ""
     else{
       const v = "rotate(" + this.Grad+"deg)";
      return v;
     }
   }
 convertDate(dat:string,st_end:number):Date{
 // let d1 = format(dat,'DD.MM.YYYY HH:mm ZZ');
 //13.12.2017 15:00  new Date(year, month, day, hours, minutes, seconds, milliseconds)
 // let d1 = format(dat, 'DD.MM.YYYY HH:mm');
 if(dat=="" || dat== undefined) {
  if( st_end === 0){
  this.date= new Date();
   let min = this.date.getMinutes();
   let h = this.date.getHours();
   if(min <=15) min = 15;
   else if(min <=30) min = 30;
   else if(min <=45) min = 45;
   else {min = 0; h += 1; if(h>24) h = 1;}
   this.date.setMinutes(min);
   this.date.setHours(h);
   return this.date;
  }
  else{
    let minutes = 30;
    let date1= new Date(this.date);
    return new Date(date1.getTime() + minutes*60000);
   
  }
   
 } 
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
      startAt:this.convertDate(this.StartAt,0),
      endAt:this.convertDate(this.EndAt,1) ,
      room_abbr: this.Room,
      number: this.rnum ,     
      block: this.block,
      floor: this.floor,
      corridor: this.corridor ,
      descr:this.Descr,
      isM: this.IsM,
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
