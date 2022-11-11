import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private httpClient: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return this.httpClient.get<Event[]>
    (`${environment.url}/events`);
  }
  addEvent(event: Event): Observable<Event> {
    return this.httpClient.post<Event>
    (`${environment.url}/events`, event)
  }
  getEvent(id: string): Observable<Event> {
    return this.httpClient.get<Event>(`${environment.url}/event/${id}`);
  }

  editEvent(event: Event): Observable<Event> {
    return this.httpClient.put<Event>(`${environment.url}/events`, event);
  }

  deleteEvent(id: string): Observable<Event> {
    return this.httpClient.delete<Event>(`${environment.url}/event/${id}`);
  }
}
