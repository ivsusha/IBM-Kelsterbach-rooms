
import { Http, Headers, Response } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { MeetingObj } from './meetingobject';

 @Injectable()
export class RoomsService {
   extdbPath: any;
   extdbUrl: String;
   constructor(private http: Http) {}  
   getRooms() {
    const headers = new Headers({
    'Content-Type': 'application/json;charset=utf-8'
 });

   return (this.http.get('rooms.xsp?view=all', { headers: headers }));
   }
   
   setRoom(roomArray:{geb: string, descr: string, x: string, y: string }){
     const body = JSON.stringify(roomArray);
 //    const body = "{geb:" + "'"+roomArray.geb + "'"+ ', descr:' + "'"+roomArray.descr + "'"+
 //    ", x:" + "'"+roomArray.x + "%'" +", y:" + "'"+roomArray.y + "%'}"
     let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' }); 
    return (this.http.post('rooms.xsp?view=save', body, { headers: headers }));
   }
   setCoord(roomArray:{geb: string, position: string, x: string, y: string,descr: string,grad: string }){ 
    
   // const body1 = JSON.stringify(roomArray);
        const body = "{geb:" + "'"+roomArray.geb + "'"+ ', descr:' + "'"+roomArray.descr + "'"+',position:'+"'"
        +roomArray.position+"'"+
     ", x:" + "'"+roomArray.x + "'" +", y:"  + "'"+roomArray.y + "'"+ ",grad:'"+roomArray.grad+"'}";
    
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
   return (this.http.post('rooms.xsp?view=saveM', body, { headers: headers }));
  }
   isAdmin() {
    let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
       return(this.http.get('rooms.xsp?view=isadmin', { headers: headers }));
     }
     getReservedTime(body,dbpath){
      let headers = new Headers([{ 'Content-Type': 'application/json;charset=utf-8' }]);
      const possibleEvent = JSON.stringify(body);
      return (this.http.post('rooms.xsp?view=reserved&path='+dbpath, possibleEvent, { headers: headers }));
     }
     getFreeMeetingRooums(body,dbpath):Observable<MeetingObj[]>{
      const possibleEvent = JSON.stringify(body);
      let headers = new Headers([{ 'Content-Type': 'application/json;charset=utf-8' }]);
      
        
      
   //   let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
 //    return (this.http.post(dbpath+'/quiet.xsp', possibleEvent, { headers: headers }));
 //  const myurl = encodeURI(dbpath+'/quiet.xsp?block='+body.block+'&floor='+body.floor+'&corridor='+
 //  body.corridor+'&startsAt='+body.startsAt+'&endsAt='+body.endsAt);
  // return (this.http.get(myurl,  { headers: headers }));

 // return (this.http.post(dbpath+'/xsp/quietRoomGetByParam', possibleEvent, { headers: headers }));
 return (this.http.post('rooms.xsp?view=free&path='+dbpath, possibleEvent, { headers: headers }).map(
  data =>{
   // let result = data["_body"];
   let result = data.json();
    return result.map(function(mroom:any) { 
      return {roomId : mroom.universalId,
       description : mroom.description,
        capacity : mroom.capacity,
        geb:  mroom.block,
        floor:  mroom.floor,
        corridor: mroom.corridor,
        number: mroom.number,
        start : mroom.start,
       end : mroom.end};
    });

  }
  
 ));
     }
  reserve(body) {
  //  const possibleEvent = JSON.stringify(body);
    let url = this.GetQuietRoomUrl();
    let headers = new Headers([{ 'Content-Type': 'application/json;charset=utf-8' }]);
    return (this.http.post(url+'/xsp/requestSynchronize', body, { headers: headers }));
  } 
  SetQuietRoomUrl(url){
     this.extdbUrl = url;
  }
  GetQuietRoomUrl(){ return  this.extdbUrl};
  SetQuietRoomDbPath(dbpath){
    this.extdbPath = dbpath;
 }
 GetQuietRoomDbPath(){ return  this.extdbPath};
}
