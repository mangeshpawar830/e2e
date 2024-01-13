import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { AuthService } from '../login/auth.service';
import { User } from './user';
import { Router } from '@angular/router';

interface Ticket {
  id: number;
  title: string;
  text: string;
  resolution: string;
  assignedUserId: number | null;
}

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  openTickets: Ticket[] = [];
  errorMessage = '';
  loading = true;
  users: User[] = [];
  selectedUserId: number | null = null; // Add this line

  constructor(private ticketService: TicketService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.refreshOpenTickets();
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  assignTicket(ticket: Ticket): void {
    if (this.selectedUserId !== null) { 
      this.ticketService.assignTicketToEngineer(ticket.id, this.selectedUserId).subscribe(
        () => {
          console.log('Ticket assigned successfully.');
          this.refreshOpenTickets();
        },
        (error) => {
          console.error('Error assigning ticket:', error);
        }
      );
    }
  }

  changeTicketStatus(ticketId: number, status: string): void {
    this.ticketService.changeTicketStatus(ticketId, status).subscribe(
      () => {
        console.log('Ticket status changed successfully.');
        this.refreshOpenTickets();
      },
      (error) => {
        console.error('Error changing ticket status:', error);
      }
    );
  }

  private refreshOpenTickets(): void {
    this.ticketService.getAllOpenTickets().subscribe(
      (response: Ticket[]) => {
        this.loading = false;
        this.openTickets = response;
      },
      (error) => {
        this.loading = false;
        this.errorMessage = 'Error refreshing open tickets';
        console.error('Error refreshing open tickets:', error);
      }
    );
  }


  
  openTicket(ticket: Ticket): void {
    this.router.navigate(['/ticket-details', ticket.id]);
  }
}
