import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'todo-mean';
  readonly APIUrl = 'http://localhost:3001/api/todoapp/';

  constructor(private http: HttpClient) {}
  notes: any = [];

  refreshNotes() {
    this.http.get(this.APIUrl + 'get-notes').subscribe((data) => {
      this.notes = data;
    });
  }

  ngOnInit() {
    this.refreshNotes();
  }

  addNotes() {
    let newNotes = (<HTMLInputElement>document.getElementById('newNotes'))
      .value;
    let formData = new FormData();
    formData.append('newNotes', newNotes);
    this.http.post(this.APIUrl + 'add-notes', formData).subscribe((data) => {
      alert(data);
      this.refreshNotes();
    });
  }

  deleteNotes(id: any) {
    this.http
      .delete(this.APIUrl + 'delete-notes?id=' + id)
      .subscribe((data) => {
        alert(data);
        this.refreshNotes();
      });
  }
}
