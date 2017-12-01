import { getTestBed } from '@angular/core/testing';
import { Http, Headers, Response } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

 @Injectable()
export class RoomsService {

   constructor(private http: Http) {}
   // tslint:disable-next-line:one-line
   getRooms() {
    const headers = new Headers({
    'Content-Type': 'application/json;charset=utf-8'
 });
//headers.append("Access-Control-Allow-Origin", "*");
//headers.append("Access-C"Aontrol-Allow-Credentials", "true");
//headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//headers.append("Access-Control-Allow-Headers", " Authorization,Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  

  //  let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
  //  const header = new Headers({'Content-Type': 'application/json'});
   // return (this.http.get('assets/rooms.json', { headers: headers }));
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
     getFreeMeetingRooums(body,dbpath){
      const possibleEvent = JSON.stringify(body);
      let headers = new Headers([{ 'Content-Type': 'application/json;charset=utf-8' }]);
      
        
      
   //   let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      return (this.http.post(dbpath+'/xsp/quietRoomGetByParam', possibleEvent, { headers: headers }));
     }
   
}
