import { ExamService } from './../exam.service';
import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-average',
  templateUrl: './average.component.html',
  styleUrl: './average.component.scss'
})
export class AverageComponent {

  constructor(private _authService: AuthService, private _examService: ExamService){ }

    onPrint() {
      console.log('LOOGED USER: ', this._authService.getUser())
    }

    onSend(){
      this._examService.sendNewScore([79,80,90])
    }

}
