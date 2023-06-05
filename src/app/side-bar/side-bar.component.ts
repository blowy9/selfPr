import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import { MatInput } from '@angular/material';
import {map, Observable} from "rxjs";


class User {
  name: any;
}

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent {

  startDate: Date
  endDate: Date

  @Output() params = new EventEmitter<string>()

  toUsedFormat(parameter: Date){
    return parameter.toLocaleDateString().split(".").reverse().join("/")
  }

  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;

  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;

  resetForm() {
    this.fromInput.value = '';
    this.toInput.value = '';
    this.startDate = null
    this.endDate = null
    this.getParams()
  }

  sortMethods = new FormControl('');

  sortMethodsList: string[] = [`\u{21D1}` + ' Date',`\u{21D3}` + ' Date ' ];

  getParams(){
    if(this.startDate && this.endDate){
        this.params.emit("startDate=" + this.toUsedFormat(this.startDate) + "&endDate=" + this.toUsedFormat(this.endDate))
      }else{
      if(this.startDate){
        this.params.emit("startDate=" + this.toUsedFormat(this.startDate))
    }else if(this.endDate){
        this.params.emit("endDate=" + this.toUsedFormat(this.endDate))
      }else this.params.emit("")
    }
  }

  output(one: any, two: any){
    let newOne = one.split("/").reverse().join("/")
    let newTwo = two.split("/").reverse().join("/")
    console.log(newOne, newTwo)
  }

  ngOnInit() {
  }
}
