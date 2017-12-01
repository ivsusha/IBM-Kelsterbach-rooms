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
import { ReserveComponent } from './reserve/reserve.component';
import {Routes, RouterModule} from '@angular/router';
import { BuildingComponent } from './building/building.component';
export const appRoutes: Routes =[
  { path: '', component: BuildingComponent, pathMatch: 'full'},
  {path: 'rooms', component: BuildingComponent},   
  { path: 'reserve', component:ReserveComponent},   
  { path: '**', redirectTo: '/'}
];
@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    SearchFilter,
    EnterComponent,
    ConfirmComponent,
    AddRoomCoord,
    SelectMeetingComponent,
    MeetingComponent,
    ReserveComponent,
    BuildingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes,{useHash:true}),
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
