import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerInputEvent} from "@angular/material/datepicker";


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent {
  display = true
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
}
