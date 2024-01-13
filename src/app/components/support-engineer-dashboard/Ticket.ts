export interface Ticket {
    id: number;
    title: string;
    text: string;
    resolution: string;
    client: Client; 
    assignedUserId: number | null;
  }

  interface Client{
    id: number;
    name?:string,
  }