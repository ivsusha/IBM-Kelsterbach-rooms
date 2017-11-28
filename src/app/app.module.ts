import { ConfirmComponent } from './modal.component';
import { AddRoomCoord } from './modal.coord'
import { SearchFilter } from './search.filter';
import { RoomsService } from './getRoomsService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RoomComponent } from './room/room.component';
import { EnterComponent } from './enter/enter.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MeetingComponent } from './meeting/meeting.component';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { SelectMeetingComponent } from './modalfilter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    SearchFilter,
    EnterComponent,
    ConfirmComponent,
    AddRoomCoord,
    SelectMeetingComponent,
    MeetingComponent
  ],
  imports: [
    BrowserModule,
    DateTimePickerModule,
    FormsModule,
    HttpModule,
    BootstrapModalModule,
    BrowserAnimationsModule
  ],
  providers: [
    RoomsService
  ],
  entryComponents: [
    ConfirmComponent,
    AddRoomCoord,
    SelectMeetingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
