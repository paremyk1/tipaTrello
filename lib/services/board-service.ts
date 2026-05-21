import { prisma } from '@/lib/db/prisma';
export const boardService = {
  async listBoards() {
    const boards = await prisma.board.findMany({ include: { lists: { include: { cards: true }, orderBy: { order: 'asc' } } } });
    return boards.map((b) => ({ ...b, lists: b.lists.map((l) => ({ ...l, cards: l.cards.sort((a,b)=>a.order-b.order) })) }));
  }
};
