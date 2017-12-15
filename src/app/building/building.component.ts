import { Response } from '@angular/http';
import { RoomsService } from '../getRoomsService';
import { ConfirmComponent } from '../modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { AddRoomCoord } from '../modal.coord';
import { RoomComponent } from '../room/room.component';
import { SelectMeetingComponent } from '../modalfilter';
import { MeetingObj } from '../meetingobject';


@Component({
    selector: 'app-building', 
    templateUrl: './building.component.html',
    styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit, AfterViewChecked {
    modeAll = false;
    modeMeeting = false;
    search = '';
    mySearch1 = '';
    isAdmin: boolean;
    dbpath; webpath;
    xPos;
    gebE0 = false;
    gebE1 = false;
    gebE2 = false;
    gebE3 = true;
    gebU1 = false;
    gebU2 = false;
    selfloor = "3";
    title = 'IBM Kelsterbach Rooms Plan - Geb.51. Etage - ';// + this.getEtage();
    //  meetArray: {
    //      geb: string, xleft: string, yleft: string, xtop: string, ytop: string, com: string, isFree: string,
    //       roomId: string, description: string, capacity: string, start: string, end: string
    //   }[] = [];
    meetinRoomsArray: MeetingObj[] = [];
    @ViewChild(RoomComponent)
    private meeting: RoomComponent;
    constructor(private dialogService: DialogService, private roomservice: RoomsService) { }

    ngOnInit() {
        this.roomservice.isAdmin().subscribe(
            (response: Response) => {
                const temp = response.json();
                if (temp.admin == 'true') this.isAdmin = true;
                else this.isAdmin = false;
                this.dbpath = temp.path;
                this.webpath = temp.webpath;
                this.roomservice.SetQuietRoomUrl(this.webpath);
                this.roomservice.SetQuietRoomDbPath(this.dbpath);
            },
            (error) => this.isAdmin = false
        )
        // this.meetArray = this.meeting.getMeetingRooms();
        this.meetinRoomsArray = this.meeting.getMeetingRooms();
    }

    ngAfterViewChecked() {
        //  if (this.meetArray == null) this.meetArray = this.meeting.getMeetingRooms();
        if (this.meetinRoomsArray == null) this.meetinRoomsArray = this.meeting.getMeetingRooms();

    }

    onAllRooms() {
        this.modeAll = !this.modeAll;
        if (this.modeAll) this.modeMeeting = false;
    }
    onMRooms() {
        this.modeMeeting = !this.modeMeeting;
        if (this.modeMeeting) this.modeAll = false;
    }
    getEtage() {
        if (this.gebE0) return "E";
        if (this.gebE1) return "1";
        if (this.gebE2) return "2";
        if (this.gebE3) return "3";
        if (this.gebU1) return "U1";
        if (this.gebU2) return "U2";

    }
    isMVisible(room) {
        // Geb_51_E3_2.3.024
        let et = this.getEtage();
        if (et == "E") et = "0";
        if (room.includes('_E' + et)) return "visible";
        if (room.includes('_U1') && et == "U1") return "visible";
        if (room.includes('_U2') && et == "U2") return "visible";
        return "hidden";
    }
    getWidth(m) {
        if (m.xtop == undefined) return "";
        return (parseFloat(m.xtop.substring(0, 5)) - parseFloat(m.xleft.substring(0, 5))) + "%"
    }
    getHeight(m) {
        if (m.ytop == undefined) return "";
        return (parseFloat(m.yleft.substring(0, 5)) - parseFloat(m.ytop.substring(0, 5))) + "%"
    }
    showConfirm(ev) {
        if (this.isAdmin === false) return;
        if (this.modeAll === false && this.modeMeeting === false) return;

        const cx = ev.offsetX == undefined ? ev.layerX : ev.offsetX;
        const cy = ev.offsetY == undefined ? ev.layerY : ev.offsetY;
        console.log("X1" + cx);
        console.log('Y1' + cy);
        var build;
        if (this.gebE0) build = document.getElementById('building0');
        if (this.gebE1) build = document.getElementById('building1');
        if (this.gebE2) build = document.getElementById('building2');
        if (this.gebE3) build = document.getElementById('building3');
        if (this.gebU1) build = document.getElementById('buildingU1');
        if (this.gebU2) build = document.getElementById('buildingU2');
        // const build = document.getElementById('building');
        let rect = build.getBoundingClientRect();
        let img_w = rect.width;
        let img_h = rect.height;

        if (this.modeMeeting) {
            let posx = ((cx) * 100 / (img_w)) + "%";
            let posy = ((cy) * 100 / (img_h)) + "%";
            const item = document.getElementById('cursor');
            if (!item.getAttribute('name')) {
                alert("Choose a room first!");
                return;
            }
            // alert(item.getAttribute('name') + ';' + cx+';'+cy);

            let disposable = this.dialogService.addDialog(AddRoomCoord, {
                title: 'Enter values',
                message: 'Confirm message',
                geb: item.getAttribute('name'),
                position: '',
                xPos: posx,
                yPos: posy,
                degree: '',
            },
            ).subscribe((isConfirmed) => {
                // We get dialog result
                if (isConfirmed) {
                    alert('Document was saved');
                }
                else {
                    //        alert('Canceled');
                }
            });


            return;
        }
        const cursor = document.getElementById('cursor');
        let posx = ((cx) * 100 / (img_w)) - 1 + "%";
        let posy = ((cy) * 100 / (img_h)) - 2 + "%";
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title: 'Enter values',
            message: 'Confirm message',
            xPos: posx,
            yPos: posy
        },
        ).subscribe((isConfirmed) => {
            // We get dialog result
            if (isConfirmed) {
                alert('Document was saved');
            }
            else {
                //        alert('Canceled');
            }
        });
        //We can close dialog calling disposable.unsubscribe();
        // If dialog was not closed manually close it by timeout

        //      setTimeout(()=>{
        //         disposable.unsubscribe();
        //     },10000);
    }

    onChange(value) {
        this.gebE0 = false;
        this.gebE1 = false;
        this.gebE2 = false;
        this.gebE3 = false;
        this.gebU1 = false;
        this.gebU2 = false;
        const cursor = document.getElementById('cursor');
        cursor.style.visibility = 'hidden';
        if (value == "3") this.gebE3 = true;
        else if (value == "2") this.gebE2 = true;
        else if (value == "1") this.gebE1 = true;
        else if (value == "0") this.gebE0 = true;
        else if (value == "-1") this.gebU1 = true;
        else if (value == "-2") this.gebU2 = true;
    }

    onRoomChanged(room: string) {
        this.gebE0 = false;
        this.gebE1 = false;
        this.gebE2 = false;
        this.gebE3 = false;
        this.gebU1 = false;
        this.gebU2 = false;
        if (room.includes('51_E1')) {this.gebE1 = true; this.selfloor = "1"};
        if (room.includes('51_E2'))  {this.gebE2 = true; this.selfloor = "2"};
        if (room.includes('51_E3'))  {this.gebE3 = true; this.selfloor = "3"};
        if (room.includes('51_E0'))  {this.gebE0 = true; this.selfloor = "0"};
        if (room.includes('51_U1'))  {this.gebU1 = true; this.selfloor = "-1"};
        if (room.includes('51_U2'))  {this.gebU2 = true; this.selfloor = "-2"};
        this.title = 'IBM Kelsterbach Rooms Plan - Geb.51. Etage - ';// + this.getEtage();

    }
    //freeMArray: {geb: string, xleft: string,yleft: string,xtop: string, ytop: string, com: string}[] = [];

    onFreeRooms() {
        let freeMeetings: MeetingObj[] = [];
        let disposable = this.dialogService.addDialog(SelectMeetingComponent, {
            title: 'Enter values',
            message: 'Confirm message',
        },
        ).subscribe((result) => {

            if (result == undefined) return;
            // We get dialog result 

            this.roomservice.getFreeMeetingRooums(result, this.dbpath).subscribe(
                (response) => {
                    freeMeetings = response;
                    //  const freeMArray =  response.json();
                    //    console.log(response); 
                    let e; let r;
                    for (let m in this.meetinRoomsArray) {
                        this.meetinRoomsArray[m].isFree = '';
                        this.meetinRoomsArray[m].start = '';
                        this.meetinRoomsArray[m].end = '';
                    }
                    for (let i in freeMeetings) {
                        // Geb_51_E0_1.0.001   Geb_51_U1_1.U1.001

                        if (freeMeetings[i].floor.toUpperCase().endsWith("U1") || freeMeetings[i].floor.toUpperCase().endsWith("U2")) {
                            r = "Geb_" + freeMeetings[i].geb + "_" + freeMeetings[i].floor + "_" + freeMeetings[i].corridor + "." +
                                freeMeetings[i].floor + "." + freeMeetings[i].number;
                        }
                        else {
                            e = freeMeetings[i].floor.slice(-1);
                            r = "Geb_" + freeMeetings[i].geb + "_E" + e + "_" + freeMeetings[i].corridor + "." +
                                e + "." + freeMeetings[i].number;
                        }
                        for (let n in this.meetinRoomsArray) {
                            if (this.meetinRoomsArray[n].geb == r) {
                            this.meetinRoomsArray[n].isFree = 'free';
                                this.meetinRoomsArray[n].roomId = freeMeetings[i].roomId;
                                this.meetinRoomsArray[n].description = freeMeetings[i].description;
                                this.meetinRoomsArray[n].capacity = freeMeetings[i].capacity;
                                this.meetinRoomsArray[n].start = freeMeetings[i].start;
                                this.meetinRoomsArray[n].end = freeMeetings[i].end;
                                break;
                            }
                        }
                    }
                },
                (error) => { console.log(error); alert(error) }
            );


        });


    }



    addElement(parentId, elementTag, elementId, html) {
        // Adds an element to the document
        var p = document.getElementById(parentId);
        var newElement = document.createElement(elementTag);
        newElement.setAttribute('id', elementId);
        newElement.innerHTML = html;
        p.appendChild(newElement);
    }

}
