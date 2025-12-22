import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, MoreHorizontal, Plus } from 'lucide-react';
import { Board, Card, List } from '../data/schema';
import { useMemo, useState } from 'react';
import { CardTile } from './card/CardTile';
import { DndContext, PointerSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { rectSortingStrategy } from '@dnd-kit/sortable';
import { useBoardStore } from '../store/useBoardStore';
import { Button } from '../components/ui/button';

interface ListColumnProps {
  list: List;
  cards: Card[];
  board: Board;
}

export const ListColumn: React.FC<ListColumnProps> = ({ list, cards, board }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: list.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const [adding, setAdding] = useState(false);
  const addCard = useBoardStore((s) => s.addCard);
  const moveCard = useBoardStore((s) => s.moveCard);

  const sensors = useSensors(useSensor(PointerSensor));
  const cardOrder = useMemo(() => cards.map((c) => c.id), [cards]);

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="w-80 shrink-0">
      <div className="list-shadow rounded-xl bg-white/15 backdrop-blur">
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center gap-2" {...listeners}>
            <GripVertical className="h-4 w-4 text-white/70" />
            <input
              defaultValue={list.title}
              className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
            />
          </div>
          <button className="rounded p-1 text-white/70 hover:bg-white/10">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={(event) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;
            const oldIndex = cardOrder.indexOf(String(active.id));
            const newIndex = cardOrder.indexOf(String(over.id));
            moveCard(String(active.id), list.id, newIndex);
          }}
        >
          <SortableContext items={cardOrder} strategy={rectSortingStrategy}>
            <div className="space-y-2 px-2 pb-2">
              {cards.map((card) => (
                <CardTile key={card.id} card={card} board={board} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <div className="px-2 pb-3">
          {adding ? (
            <div className="rounded-lg bg-white/10 p-2">
              <input
                className="w-full rounded-md bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none"
                placeholder="Название карточки"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    const now = new Date().toISOString();
                    addCard({
                      id: `card-${Date.now()}`,
                      listId: list.id,
                      title: e.currentTarget.value,
                      labels: [],
                      members: [],
                      checklists: [],
                      attachments: [],
                      comments: [],
                      activity: [],
                      watchers: [],
                      createdAt: now,
                      updatedAt: now,
                    });
                    e.currentTarget.value = '';
                    setAdding(false);
                  }
                }}
              />
              <div className="mt-2 flex items-center gap-2">
                <Button size="sm">Добавить</Button>
                <Button variant="ghost" size="sm" onClick={() => setAdding(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10"
            >
              <Plus className="h-4 w-4" /> Добавить карточку
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
