import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  noteToAdd: string = '';
  notes: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getNotes();
  }

  /**
   * Add a new note to the array
   */
  addNote(): void {
    if(!(this.noteToAdd == '')){
      this.notes.push(this.noteToAdd);
      this.noteToAdd = '';

      localStorage.setItem('notes', JSON.stringify(this.notes));
    }
  }

  /**
   * Return all the notes on the 'notes' array
   * @returns string notes
   */
  getNotes(): Observable<string[]> {
    let local = localStorage.getItem('notes');

    if(local){
      this.notes = <string[]>(JSON.parse(local));
    }

    return of(this.notes);
  }

  /**
   * delete a specific note
   * @param index index of the selected note
   */
  deleteNote(index:number) : void {
    this.notes.splice(index, 1);

    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

}
