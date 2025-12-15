export type Visibility = 'private' | 'workspace' | 'public';

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

export interface Card {
  id: string;
  listId: string;
  title: string;
  description?: string;
  labels: string[];
  members: string[];
  cover?: string;
  startDate?: string;
  dueDate?: string;
  completed?: boolean;
  checklists: Checklist[];
  attachments: string[];
  comments: Comment[];
  activity: string[];
  watchers: string[];
  archived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface List {
  id: string;
  boardId: string;
  title: string;
  cardIds: string[];
  archived?: boolean;
}

export interface BoardMember {
  id: string;
  name: string;
  avatar?: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Board {
  id: string;
  title: string;
  background: string;
  visibility: Visibility;
  isStarred?: boolean;
  members: BoardMember[];
  labels: Label[];
  listsOrder: string[];
  isPremium?: boolean;
}

export interface ScheduledBlock {
  id: string;
  cardId?: string;
  externalEventId?: string;
  date: string;
  startMinutes: number;
  durationMinutes: number;
  title: string;
  source: 'card' | 'google';
}

export interface CalendarProvider {
  isConnected: () => boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  listCalendars: () => Promise<string[]>;
  listEvents: (range: { start: Date; end: Date }) => Promise<ScheduledBlock[]>;
  upsertEventFromCard: (card: Card) => Promise<void>;
  deleteEventForCard: (cardId: string) => Promise<void>;
}
