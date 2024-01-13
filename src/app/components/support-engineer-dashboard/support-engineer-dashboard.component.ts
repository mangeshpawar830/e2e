import { Component } from '@angular/core';
import { TicketService } from '../ticket.service';
import { AuthService } from '../login/auth.service';
import { Ticket } from './Ticket';
import { Router } from '@angular/router';





@Component({
  selector: 'app-support-engineer-dashboard',
  templateUrl: './support-engineer-dashboard.component.html',
  styleUrl: './support-engineer-dashboard.component.css'
})
export class SupportEngineerDashboardComponent {
  tickets: Ticket[]= [];
  errorMessage!: string;
  userId: number | null = null;


  constructor(private ticketService: TicketService, private authService: AuthService, private router: Router) { }

  
  ngOnInit(): void {
    const authenticatedUser = this.authService.getAuthenticatedUser();

    if (authenticatedUser) {
      this.userId = authenticatedUser.id;

      this.ticketService.getEngineerTickets(this.userId!).subscribe(
        (response: Ticket[]) => {
          console.log('Response from getEngineerTickets:', response);

          this.tickets = response;
        },
        (error) => {
          console.error('Error fetching assigned tickets:', error);
          this.errorMessage = 'Error fetching assigned tickets. Please try again.';
        }
      );
    }
  }


  openTicket(ticket: Ticket): void {
    this.router.navigate(['/ticket-details', ticket.id]);
  }

  

}
