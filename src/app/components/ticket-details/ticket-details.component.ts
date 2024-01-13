
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../ticket.service';
import { Ticket } from '../support-engineer-dashboard/Ticket';
import { Client, Comment } from './comment.model';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  ticket: Ticket | undefined;
  comments: Comment[] = [];
  newStatus: string = '';
  newComment: Comment = { id: 0, text: '', user: { id: 0 }, client: { id: 0 }, ticket: { id: 0 } };

  constructor(private route: ActivatedRoute, private ticketService: TicketService , private authService:AuthService) {}

  ngOnInit(): void {
    this.loadTicketDetails();
    this.loadComments();
  }

  private loadTicketDetails(): void {
    const ticketId = this.route.snapshot.params['id'];
    this.ticketService.getTicketDetails(ticketId).subscribe(
      (ticket: Ticket) => {
        this.ticket = ticket;
      },
      (error) => {
        console.error('Error fetching ticket details:', error);
      }
    );
  }

  private loadComments(): void {
    if (this.ticket) {
      const ticketId = this.ticket.id;
      this.ticketService.getTicketComments(ticketId).subscribe(
        (comments: Comment[]) => {
          this.comments = comments;
        },
        (error) => {
          console.error('Error fetching ticket comments:', error);
        }
      );
    } else {
      console.error('Ticket is not available to load comments.');
    }
  }

  changeTicketStatus(status: string): void {
    if (this.ticket) {
      this.ticketService.changeTicketStatus(this.ticket.id!, status).subscribe(
        () => {
          this.loadTicketDetails();
        },
        (error) => {
          console.error('Error changing ticket status:', error);
        }
      );
    } else {
      console.error('Ticket is not available to change status.');
    }
  }

  addComment(commentText: string): void {
    console.log('Ticket:', this.ticket);
  console.log('Client:', this.ticket?.client.id);
    if (this.ticket) {
      const userId = this.authService.getUserId();
      console.log('userId:', userId);

      const comment: Comment = {
        id: 0,
        text: commentText,
        user: { id: userId },
        client: { id: this.ticket?.client.id },
        ticket: { id: this.ticket.id }
      };
  
      this.ticketService.addComment(comment).subscribe(
        () => {
          this.loadComments();
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    } else {
      console.error('Ticket, User, or Client is not available to add a comment.');
    }
  }
  
}
