'use client';
import { create } from 'zustand';
import { Board } from '@/lib/types/domain';

type State = {
  boards: Board[];
  activeBoardId?: string;
  setBoards: (boards: Board[]) => void;
  moveCard: (boardId: string, fromList: string, toList: string, cardId: string) => void;
};

export const useBoardStore = create<State>((set) => ({
  boards: [],
  setBoards: (boards) => set({ boards, activeBoardId: boards[0]?.id }),
  moveCard: (boardId, fromList, toList, cardId) =>
    set((s) => ({
      boards: s.boards.map((b) => {
        if (b.id !== boardId) return b;
        const source = b.lists.find((l) => l.id === fromList);
        const target = b.lists.find((l) => l.id === toList);
        if (!source || !target) return b;
        const card = source.cards.find((c) => c.id === cardId);
        if (!card) return b;
        return {
          ...b,
          lists: b.lists.map((l) => l.id === fromList ? { ...l, cards: l.cards.filter((c) => c.id !== cardId) } : l.id === toList ? { ...l, cards: [...l.cards, card] } : l)
        };
      })
    }))
}));
