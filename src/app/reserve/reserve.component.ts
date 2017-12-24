import { Component, OnInit } from '@angular/core';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { Router, ActivatedRoute } from '@angular/router';
import * as format from 'date-fns/format';
@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
  }
onReserve(){}
onBack(){
  this.router.navigate(['']);
}
}
