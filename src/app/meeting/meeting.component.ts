
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  rnum : string;
  constructor() { }

  ngOnInit() {
    let len = this.Room.length;
    this.rnum = this.Room.substring(len-3);
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
}
