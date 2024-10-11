import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCardComponent } from './user-card/user-card.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { HistoryComponent } from './history/history.component';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { PersonComponent } from './person/person.component';
import { filter, from, map, tap } from 'rxjs';
import { AppColorsDirective } from './app-colors.directive';
import { CreateHtmlDirective } from './create-html.directive';

interface IPerson {
  name: string;
  lastName: string;
  age?: number;
}

interface Person {
  name: string;
  gender: string;
  age: number;
  discount?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UserCardComponent,
    CalculatorComponent,
    HistoryComponent,
    CommonModule,
    CounterComponent,
    PersonComponent,
    AppColorsDirective,
    CreateHtmlDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  persons: Person[] = [
    { name: 'Juan', gender: 'male', age: 20 },
    { name: 'Ana', gender: 'female', age: 17 },
    { name: 'Luis', gender: 'male', age: 30 },
    { name: 'Maria', gender: 'female', age: 16 },
    { name: 'Diego', gender: 'female', age: 12 },
    { name: 'Pipo', gender: 'male', age: 34 },
    { name: 'Leon', gender: 'female', age: 80 },
  ];

  maleCount = 0;
  femaleCount = 0;
  discountCount = 0;

  ngOnInit(): void {
    this.calculateGenderCount();
    this.validateDiscount();
  }

  calculateGenderCount(): void {
    this.maleCount = 0;
    this.femaleCount = 0;

    this.persons.forEach((person) => {
      if (person.gender === 'male') {
        this.maleCount++; 
      } else if (person.gender === 'female') {
        this.femaleCount++;
      }
    });
  }

  validateDiscount(): void {
    this.discountCount = 0;

    this.persons.forEach((person) => {
      if (person.age >= 18) {
        this.discountCount++;
      }
    });
  }

  removeAllPersonsWithDiscount() {
    this.persons = this.persons.filter((person) => person.age < 18);
    this.validateDiscount();
    this.calculateGenderCount();
  }

  users = [
    { name: 'abc', email: 'abc@gmail.com' },
    { name: 'dfg', email: 'dfg@gmail.com' },
  ];
  selectedUser: any = this.users[0];

  userCardCreated: boolean = true;

  result: number = 0;
  history: { operation: string; result: number }[] = [];
  title: number = 10;
  animals: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  person: IPerson = {
    name: 'Juan',
    lastName: 'Perez',
    age: 25,
  };

  //spread operator
  students: number[] = [1, 2, 3, 4, 5, 6];
  parents: number[] = [7, 8, 9, 10];

  var1 = 0;
  var2 = null;
  var3 = 'hola';

  youtube = from([1, 2, 3, 4, 5, 6]);

  constructor() {
    const { name, age } = this.person;
    console.log('desestructuracion ', name, age);
    let both = [...this.students, ...this.parents];
    console.log('spread operator:', both);
    console.log('REST operator:', this.sum2(2, 4, 6));

    console.log('Nullish Coalescing:', this.var2 ?? this.var3);
    console.log('OR:', this.var1 || this.var2);

    // console.log('substract', this.substract(8,4))

    // console.log('MAP: ', this.animals.map( (animal) => (animal + 'new') ))
    // console.log('FOREACH: ', this.animals.forEach( (animal) => (animal + 'new') ))
    // console.log('FIND: ', this.animals.find( (animal) => animal === 'd' ))
    // console.log('FILTER: ', this.animals.filter( (animal) => animal === 'e' ))
    // console.log('INDEXOF: ', this.animals.indexOf('c'))

    this.youtube.subscribe((res) => {
      console.log('YOUTUBE DATA: ', res);
    });
  }

  public sum2(...persons: number[]) {
    //return persons[0] + persons[1]
    return persons.reduce(
      (acumulador, valorActual) => acumulador + valorActual,
      10
    );
  }

  public sum(num1: number, num2: number): number {
    return num1 + num2;
  }

  addVideo() {
    this.youtube
      .pipe(
        map((res: number) => {
          console.log('MAP OPERATOR RXJS: ', res);
          if (res % 2 === 0) {
            return res;
          } else {
            return null
          }
        }),
        tap((res) => {console.log('')}),
        filter((res: number | null) => res !== null)
      )
      .subscribe((res) => {
        console.log('SUBSCRIBER 2: ', res);
      });
  }

  private substract(num1: number, num2: number): number {
    return num1 - num2;
  }

  public getArray() {
    const persons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    for (let i = 0; i < persons.length; i++) {
      if (persons[i] % 2 == 0) console.log('person =', persons[i]);
    }
  }

  // function sumar(){
  //   return 1+2;
  // }

  // arrow functions
  // const suma = () => {
  //   return 1+2
  // }

  // function resta (a){
  //   return 'hola' + a;
  // }

  // const resta = (a) => ('hola' + a)

  public receiveData(data: any) {
    console.log('Print in father component: ', data);
  }

  public onResult(event: { operation: string; result: number }) {
    this.result = event.result ?? 0;
    if (event.operation !== 'Reset') {
      this.history.push(event);
    }
  }

  public onReset(): void {
    this.result = 0;
  }

  public getColor(value:any): void {
    console.log('value: ', value)
  }
}
