import { Board, Card, List, ScheduledBlock } from './schema';
import { addDays } from 'date-fns';

const today = new Date();

export const labels = [
  { id: 'l1', name: 'Product', color: '#61bd4f' },
  { id: 'l2', name: 'Bug', color: '#eb5a46' },
  { id: 'l3', name: 'Design', color: '#c377e0' },
  { id: 'l4', name: 'Review', color: '#ff9f1a' },
];

export const members = [
  { id: 'm1', name: 'Olivia Martin', avatar: 'https://i.pravatar.cc/64?img=1' },
  { id: 'm2', name: 'Ethan Clark', avatar: 'https://i.pravatar.cc/64?img=2' },
  { id: 'm3', name: 'Sophia Turner', avatar: 'https://i.pravatar.cc/64?img=3' },
];

export const cards: Card[] = [
  {
    id: 'c1',
    listId: 'list-ideas',
    title: 'Onboarding refresh',
    description: 'Rewrite onboarding emails and in-product guide for new users.',
    labels: ['l1'],
    members: ['m1'],
    cover: '#d9f0ff',
    startDate: today.toISOString(),
    dueDate: addDays(today, 3).toISOString(),
    completed: false,
    checklists: [
      {
        id: 'cl1',
        title: 'Steps',
        items: [
          { id: 'cli1', text: 'Outline flow', checked: true },
          { id: 'cli2', text: 'Update emails', checked: false },
        ],
      },
    ],
    attachments: [],
    comments: [],
    activity: [],
    watchers: [],
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: 'c2',
    listId: 'list-todo',
    title: 'Bug bash: mobile modals',
    description: 'Investigate modal close issue on Safari.',
    labels: ['l2'],
    members: ['m2', 'm3'],
    dueDate: addDays(today, -1).toISOString(),
    completed: false,
    checklists: [],
    attachments: [],
    comments: [],
    activity: [],
    watchers: [],
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: 'c3',
    listId: 'list-progress',
    title: 'New workspace switcher',
    description: 'Hover interactions and keyboard shortcuts.',
    labels: ['l3', 'l4'],
    members: ['m1'],
    startDate: addDays(today, -3).toISOString(),
    dueDate: addDays(today, 5).toISOString(),
    completed: false,
    checklists: [
      {
        id: 'cl2',
        title: 'UI polish',
        items: [
          { id: 'cli3', text: 'Blur background', checked: true },
          { id: 'cli4', text: 'Icon states', checked: false },
          { id: 'cli5', text: 'Accessibility', checked: false },
        ],
      },
    ],
    attachments: [],
    comments: [],
    activity: [],
    watchers: ['m1'],
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: 'c4',
    listId: 'list-done',
    title: 'Premium paywall refresh',
    description: 'Align with latest brand kit',
    labels: ['l1', 'l4'],
    members: ['m2'],
    startDate: addDays(today, -10).toISOString(),
    dueDate: addDays(today, -2).toISOString(),
    completed: true,
    checklists: [],
    attachments: [],
    comments: [],
    activity: [],
    watchers: [],
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
  },
  {
    id: 'c5',
    listId: 'list-frozen',
    title: 'International launch',
    description: 'Pending translations and support docs',
    labels: ['l3'],
    members: ['m3'],
    startDate: addDays(today, 7).toISOString(),
    dueDate: addDays(today, 30).toISOString(),
    completed: false,
    checklists: [],
    attachments: [],
    comments: [],
    activity: [],
    watchers: [],
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
  },
];

export const lists: List[] = [
  { id: 'list-ideas', boardId: 'b1', title: 'Идеи', cardIds: ['c1'], archived: false },
  { id: 'list-todo', boardId: 'b1', title: 'Нужно сделать', cardIds: ['c2'], archived: false },
  { id: 'list-progress', boardId: 'b1', title: 'В процессе', cardIds: ['c3'], archived: false },
  { id: 'list-done', boardId: 'b1', title: 'Готово', cardIds: ['c4'], archived: false },
  { id: 'list-frozen', boardId: 'b1', title: 'Заморожено', cardIds: ['c5'], archived: false },
];

export const boards: Board[] = [
  {
    id: 'b1',
    title: 'Команда продукта',
    background:
      'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80',
    visibility: 'workspace',
    isStarred: true,
    members,
    labels,
    listsOrder: lists.map((l) => l.id),
    isPremium: true,
  },
];

export const scheduled: ScheduledBlock[] = [
  {
    id: 'sb1',
    cardId: 'c3',
    date: today.toISOString(),
    startMinutes: 9 * 60,
    durationMinutes: 120,
    title: 'Implement switcher',
    source: 'card',
  },
  {
    id: 'sb2',
    cardId: 'c2',
    date: today.toISOString(),
    startMinutes: 13 * 60,
    durationMinutes: 60,
    title: 'Investigate modals',
    source: 'card',
  },
  {
    id: 'sb3',
    externalEventId: 'g-1',
    date: today.toISOString(),
    startMinutes: 15 * 60,
    durationMinutes: 45,
    title: 'Google event: Team sync',
    source: 'google',
  },
];

export const googleCalendars = ['Personal', 'Product', 'On-call'];
