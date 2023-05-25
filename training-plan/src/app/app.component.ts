import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'training-plan';

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.httpClient.get<any>(`${environment.server}/students/getAllStudents`).subscribe(d=>console.log(d))
    // }, 1000);
  }

}
