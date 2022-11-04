import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Event} from "../models/event";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  eventForm!: FormGroup;
  @Output() createEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // add validation using forms - FormGroup
    this.eventForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ]),
      description: new FormControl('', Validators.required),
      location: new FormControl('',Validators.required)
    });
  }
  // add function
  add(): void {
    const form = this.eventForm.value;

    //emit is used to fire an event
    this.createEvent.emit(
      new Event(form.title,'',form.description, form.location,0));
  }


  //fetch title
  get title() { return this.eventForm.get('title')!; }

  //fetch description
  get description() { return this.eventForm.get('description')!; }

  //fetch location
  get location() { return this.eventForm.get('location')!; }

}
