'use client';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { useBoardStore } from '@/lib/store/board-store';

export function BoardView({ boardId }: { boardId: string }) {
  const board = useBoardStore((s) => s.boards.find((b) => b.id === boardId));
  const moveCard = useBoardStore((s) => s.moveCard);
  if (!board) return null;

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.data.current?.listId === over.id) return;
    moveCard(board.id, active.data.current?.listId, String(over.id), String(active.id));
  };

  return (
    <div className='h-screen overflow-x-auto p-4' style={{ background: board.background || '#0079bf' }}>
      <DndContext onDragEnd={onDragEnd}>
        <div className='flex gap-4'>
          {board.lists.map((list) => (
            <motion.section key={list.id} layout className='w-80 rounded-xl bg-slate-100 p-3 shadow-xl'>
              <h3 className='mb-3 font-semibold'>{list.title}</h3>
              <div id={list.id} className='space-y-2 min-h-16'>
                {list.cards.map((card) => (
                  <motion.article
                    key={card.id}
                    layout
                    drag
                    whileDrag={{ scale: 1.03 }}
                    data-id={card.id}
                    className='rounded-lg bg-white p-3 shadow hover:shadow-md cursor-grab'
                  >
                    {card.title}
                  </motion.article>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
