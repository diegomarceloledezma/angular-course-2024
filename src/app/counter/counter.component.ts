import { Component, afterRender, afterNextRender } from '@angular/core';

@Component({
  selector: 'counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  sum: number = 0;
  appBackground: string = 'red';

  constructor() {
    afterRender({
      // earlyRead: () => {
      //   console.log('INTO EARLY READ ')
      //   const currentAppColor = this.appBackground;
      //   return 'From earlyRead: ' + currentAppColor;
      // },
      // mixedReadWrite: (props) => {
      //   console.log('INTO mixedReadWrite ', props)
      //   if (props.indexOf('red') > -1) {
      //     this.appBackground = 'green';
      //   } else {
      //     this.appBackground = 'red';
      //   }
      //   return 'From mixedReadWrite: ' + this.appBackground;
      // },
      write: () => {
        console.log('INTO write ');
        document.body.style.backgroundColor = this.appBackground;

        const currentColor = this.appBackground;
        if (currentColor.includes('red')) {
          this.appBackground = 'blue';
        } else {
          this.appBackground = 'red';
        }

        return 'From write: ' + this.appBackground;
      },
      read: (props) => {
        console.log('INTO READ ', props);
        const newBackground = this.appBackground;
        console.log('From read: ', newBackground)
      },
    });

    afterNextRender(() => {
      console.log('AFTER NEXT RENDER: ', this.sum);
    });
  }
}
