import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'akita-crud-app';

  public languages : string[] = ['C', 'C++', 'Go', 'Python', 'Typescript', 'Swift'];

  pipeMetadata = { count : 2 };
}
