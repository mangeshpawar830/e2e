import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './support-engineer-dashboard/Ticket';
import { Comment } from './ticket-details/comment.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) {}

  getEngineerTickets(id: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets/engineer/${id}`);
  }

  getAllOpenTickets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tickets/open`);
  }

  assignTicketToEngineer(ticketId: number, id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/tickets/${ticketId}/assign/${id}`, {});
  }

  changeTicketStatus(ticketId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/tickets/${ticketId}/status/${status}`, {});
  }

  addComment(comment: Comment): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/comments`, comment);
  }
  
getTicketDetails(ticketId: number): Observable<any> {
  const url = `${this.baseUrl}/tickets/${ticketId}`;
  return this.http.get(url);
}

getTicketComments(ticketId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`${this.baseUrl}/tickets/comments/${ticketId}`);
}


  

}

