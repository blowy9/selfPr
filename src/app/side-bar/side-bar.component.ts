import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import { MatInput } from '@angular/material';
import {debounceTime, map, Observable, startWith, Subject} from "rxjs";


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent {

  @Input() options: string[]

  @ViewChild('fromInput', {
    read: MatInput
  }) fromInput: MatInput;

  @ViewChild('toInput', {
    read: MatInput
  }) toInput: MatInput;

  @Output() params = new EventEmitter<string>()

  sortMethods = new FormControl('');
  sortMethodsList: string[] = [`\u{21D1}` + ' Date',`\u{21D3}` + ' Date ' ];

  sortMethod: string

  startDate: Date
  endDate: Date

  titleString: string
  titleChange = new Subject<number>()

  i: number = 0

  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  constructor() {
    this.titleChange.pipe(debounceTime(300)).subscribe(x => {
      if (x != 0){
        this.getParams()
      }
      console.log("logged")
    })
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  change(){
    this.titleChange.next(this.i)
    this.i++
  }

  toUsedFormat(parameter: Date){
    return parameter.toLocaleDateString().split(".").reverse().join("/")
  }

  resetForm() {
    this.titleString = ''
    this.fromInput.value = '';
    this.toInput.value = '';
    this.startDate = null
    this.endDate = null
    this.sortMethod = null
    this.getParams()
  }

  getParams(){
    console.log(this.sortMethod)
    let paramsString = ''
    if (this.sortMethod) {
      if (this.sortMethod === `\u{21D1}` + ' Date'){
        paramsString += ("&sort=start")
      }else{
        paramsString += ("&sort=end")
      }
    }
    if(this.startDate){
      paramsString += ("&startDate=" + this.toUsedFormat(this.startDate))
    }
    if(this.endDate){
      paramsString += ("&endDate=" + this.toUsedFormat(this.endDate))
    }
    if(this.titleString){
      paramsString += ("&title=" + this.titleString)
    }
    console.log(paramsString)
    this.params.emit(paramsString)
  }

  output(one: any, two: any){
    let newOne = one.split("/").reverse().join("/")
    let newTwo = two.split("/").reverse().join("/")
    console.log(newOne, newTwo)
  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
