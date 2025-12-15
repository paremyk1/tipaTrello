import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Board, Card, List, ScheduledBlock } from '../data/schema';
import { boards as seedBoards, lists as seedLists, cards as seedCards, scheduled as seedScheduled } from '../data/seed';
import { produce } from 'immer';

interface BoardState {
  boards: Board[];
  lists: List[];
  cards: Card[];
  scheduled: ScheduledBlock[];
  toggleStar(boardId: string): void;
  updateBoard(board: Board): void;
  addCard(card: Card): void;
  updateCard(card: Card): void;
  moveCard(cardId: string, toListId: string, index?: number): void;
  moveList(boardId: string, source: number, destination: number): void;
  archiveCard(cardId: string): void;
  addScheduled(block: ScheduledBlock): void;
  updateScheduled(block: ScheduledBlock): void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set, get) => ({
      boards: seedBoards,
      lists: seedLists,
      cards: seedCards,
      scheduled: seedScheduled,
      toggleStar: (boardId) =>
        set((state) => ({
          boards: state.boards.map((b) => (b.id === boardId ? { ...b, isStarred: !b.isStarred } : b)),
        })),
      updateBoard: (board) =>
        set((state) => ({ boards: state.boards.map((b) => (b.id === board.id ? board : b)) })),
      addCard: (card) =>
        set((state) => ({
          cards: [...state.cards, card],
          lists: state.lists.map((l) => (l.id === card.listId ? { ...l, cardIds: [...l.cardIds, card.id] } : l)),
        })),
      updateCard: (card) =>
        set((state) => ({ cards: state.cards.map((c) => (c.id === card.id ? card : c)) })),
      moveCard: (cardId, toListId, index) =>
        set((state) => {
          const draft = produce(state, (draftState) => {
            const card = draftState.cards.find((c) => c.id === cardId);
            if (!card) return;
            const fromList = draftState.lists.find((l) => l.id === card.listId);
            const toList = draftState.lists.find((l) => l.id === toListId);
            if (!fromList || !toList) return;
            fromList.cardIds = fromList.cardIds.filter((id) => id !== cardId);
            const insertIndex = index ?? toList.cardIds.length;
            toList.cardIds.splice(insertIndex, 0, cardId);
            card.listId = toListId;
          });
          return draft;
        }),
      moveList: (boardId, source, destination) =>
        set((state) => ({
          boards: state.boards.map((board) => {
            if (board.id !== boardId) return board;
            const next = [...board.listsOrder];
            const [removed] = next.splice(source, 1);
            next.splice(destination, 0, removed);
            return { ...board, listsOrder: next };
          }),
        })),
      archiveCard: (cardId) =>
        set((state) => ({ cards: state.cards.map((c) => (c.id === cardId ? { ...c, archived: true } : c)) })),
      addScheduled: (block) => set((state) => ({ scheduled: [...state.scheduled, block] })),
      updateScheduled: (block) =>
        set((state) => ({ scheduled: state.scheduled.map((b) => (b.id === block.id ? block : b)) })),
    }),
    { name: 'trello-premium' }
  )
);

export const selectBoard = (boardId?: string) => (state: BoardState) =>
  state.boards.find((b) => b.id === (boardId ?? state.boards[0]?.id));

export const selectListsForBoard = (boardId: string) => (state: BoardState) =>
  state.lists.filter((l) => l.boardId === boardId && !l.archived);

export const selectCards = (state: BoardState) => state.cards;
