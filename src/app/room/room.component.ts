import { Response } from '@angular/http';
import { RoomsService } from './../getRoomsService';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MeetingObj } from '../meetingobject';
import { NgModel } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  @Input() mySearch: string ;
  @Output() onRoomChanged = new EventEmitter<string>();
  mySearch1= undefined; 
  roomArray: {geb: string,descr: string}[]=[]; 
 // meetArray: {geb: string, xleft: string,yleft: string,xtop: string, ytop: string, com: string, isFree: string, grad: string,
 //   roomId: string, description: string, capacity: string, start:string, end: string}[] = [];
    meetingObjArray: MeetingObj[] =[];
  constructor(private rooms: RoomsService ) {

   }

  ngOnInit() {
    this.rooms.getRooms().subscribe(
      (response: Response) => {
        this.roomArray = response.json();
      //  this.roomArray: {geb: string, descr: string}[] = response.json();
       // this.viewEntryArray = this.getView(viewArray);
       this.setMeetingRooms(this.roomArray);

   },
    (error) => console.log(error),
  //  () => this.setMeetingRooms(this.roomArray)
  );
  }
  setMeetingRooms(rooms){
     for(var v in rooms){
   //    (rooms[v]) =>this.meetArray.push(v);
     
       const newLocal: { geb: string, xleft: string,yleft: string,xtop: string, ytop: string, com: string,isM: string,
         isFree: string, grad: string, roomId: string, description: string, capacity: string,start: string, end:string} = rooms[v];
       
         
      if(newLocal.xleft!= undefined && newLocal.xleft!= "") {
        let meeting = new MeetingObj();
        this.meetingObjArray.push(meeting.SetValues=(rooms[v]));
    //    this.meetArray.push(newLocal);
      
      }
     }
  }
  getMeetingRooms() {
  //  return this.meetArray;
  return this.meetingObjArray;
  }
  
 onClick(entry) {   
   this.mySearch1 = entry.geb;  
   this.onRoomChanged.emit(entry.geb);
  const item = document.getElementById('cursor');
  const badge = item.getElementsByClassName('badge'); 
  
 // const build = document.getElementById('building');
  item.style.visibility = 'visible';
  item.style.zIndex = "100";
  item.style.left = entry.x;
  item.style.top = entry.y;
  item.setAttribute("name",entry.geb);
  badge[0].innerHTML = entry.descr;
//  console.log('top:'+rect.top, 'right:'+rect.right, 'bottom:'+ rect.bottom, 'left:'+ rect.left);
  this.mySearch1 = undefined;  
  var pos = item.getBoundingClientRect();
  if(pos.top>window.innerHeight)  window.scrollTo(pos.left, pos.top);
 
 }
}
