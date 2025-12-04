export type EventStatus = 'upcoming' | 'ongoing' | 'ended' | 'cancelled';

export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO string
  endDate: string;
  location: string;
  address?: string;
  imageUrl: string;
  category: string;
  status: EventStatus;
  ticketPrice: number;
  maxParticipants: number;
  currentParticipants: number;
  organizer: {
    name: string;
    avatar?: string;
  };
  tags: string[];
}