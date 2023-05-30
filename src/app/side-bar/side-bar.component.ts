import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
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
    return parameter.toLocaleDateString()
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
      }
    }
  }
  output(one: any, two: any){
    let newOne = one.split("/").reverse().join("/")
    let newTwo = two.split("/").reverse().join("/")
    console.log(newOne, newTwo)
  }

  myControl = new FormControl<string | User>('');
  options: User[] = [{name: 'Mary'}, {name: 'Shelley'}, {name: 'Igor'}];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

}
