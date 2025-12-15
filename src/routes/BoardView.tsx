import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useBoardStore, selectBoard, selectListsForBoard, selectCards } from '../store/useBoardStore';
import { ListColumn } from '../views/ListColumn';
import { Button } from '../components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { KanbanSquare, Lock, CalendarDays, Clock3, Map, Table } from 'lucide-react';

export const BoardView: React.FC = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const board = useBoardStore(useMemo(() => selectBoard(boardId), [boardId]));
  const lists = useBoardStore(useMemo(() => selectListsForBoard(board?.id ?? ''), [board?.id]));
  const allCards = useBoardStore(selectCards);
  const moveList = useBoardStore((s) => s.moveList);
  const [viewsOpen, setViewsOpen] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  if (!board) return null;

  const handleListDrag = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = board.listsOrder.indexOf(String(active.id));
    const toIndex = board.listsOrder.indexOf(String(over.id));
    if (fromIndex !== -1 && toIndex !== -1) {
      moveList(board.id, fromIndex, toIndex);
    }
  };

  const orderedLists = board.listsOrder
    .map((id) => lists.find((l) => l.id === id))
    .filter(Boolean);

  return (
    <div className="relative flex h-full flex-col" style={{ backgroundImage: `url(${board.background})` }}>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-900/90" />
      <div className="relative border-b border-white/10 px-4 py-3 backdrop-blur-lg">
        <div className="flex flex-wrap items-center gap-3 text-white">
          <div className="rounded-md bg-black/40 px-3 py-1 text-lg font-semibold shadow">{board.title}</div>
          <span className="rounded bg-white/10 px-2 py-1 text-xs">Рабочее пространство</span>
          <Popover open={viewsOpen} onOpenChange={setViewsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white gap-2">
                <KanbanSquare className="h-4 w-4" /> Виды
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="mb-3 text-sm font-semibold">Виды</div>
              <div className="space-y-2">
                <button
                  className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-sm hover:border-white/20"
                  onClick={() => {
                    setViewsOpen(false);
                    navigate(`/b/${board.id}`);
                  }}
                >
                  <span className="flex items-center gap-2">
                    <KanbanSquare className="h-4 w-4" /> Доска
                  </span>
                  <span className="text-xs text-emerald-300">Активно</span>
                </button>
                {[
                  { id: 'table', label: 'Таблица', icon: Table },
                  { id: 'calendar', label: 'Календарь', icon: CalendarDays },
                  { id: 'timeline', label: 'Хронология', icon: Clock3 },
                  { id: 'panel', label: 'Панель', icon: KanbanSquare },
                  { id: 'map', label: 'Карта', icon: Map },
                ].map((item) => {
                  const Icon = item.icon;
                  const locked = !board.isPremium || ['table', 'panel', 'map'].includes(item.id);
                  const target = item.id === 'timeline' ? `/b/${board.id}/views/timeline` : `/b/${board.id}/views/${item.id}`;
                  return (
                    <button
                      key={item.id}
                      className={`flex w-full items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-left text-sm ${
                        locked ? 'opacity-70' : 'hover:border-white/20 bg-white/5'
                      }`}
                      onClick={() => {
                        if (!locked) navigate(target);
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" /> {item.label}
                      </span>
                      {locked ? <Lock className="h-4 w-4 text-white/60" /> : <span className="text-xs text-emerald-300">Доступно</span>}
                    </button>
                  );
                })}
              </div>
              {!board.isPremium && (
                <div className="mt-4 space-y-2 rounded-lg bg-sky-500/10 p-3 text-sm">
                  <div className="font-semibold text-sky-100">Premium</div>
                  <p className="text-white/80">Откройте виды, календарь и таймлайн.</p>
                  <Button className="w-full bg-sky-600">Начать пробный период</Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="relative flex-1 overflow-x-auto pb-20">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleListDrag}>
          <div className="flex min-h-full items-start gap-4 px-4 py-6">
            <SortableContext items={board.listsOrder} strategy={rectSortingStrategy}>
              {orderedLists.map((list) => (
                <ListColumn
                  key={list!.id}
                  list={list!}
                  cards={allCards.filter((c) => c.listId === list!.id && !c.archived)}
                  board={board}
                />
              ))}
            </SortableContext>
            <div className="w-80 shrink-0 rounded-xl bg-white/10 p-4 text-white/70 hover:bg-white/15">+ Добавить колонку</div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};
