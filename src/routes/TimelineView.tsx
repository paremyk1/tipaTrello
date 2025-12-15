import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useBoardStore, selectBoard, selectListsForBoard, selectCards } from '../store/useBoardStore';
import { format, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '../lib/utils';

const rangeDays = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i));

export const TimelineView: React.FC = () => {
  const { boardId } = useParams();
  const board = useBoardStore(useMemo(() => selectBoard(boardId), [boardId]));
  const lists = useBoardStore(useMemo(() => selectListsForBoard(board?.id ?? ''), [board?.id]));
  const cards = useBoardStore(selectCards);

  if (!board) return null;

  return (
    <div className="flex h-full flex-col bg-slate-950 text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="text-lg font-semibold">Хронология</div>
        <div className="text-sm text-white/70">Day / Week</div>
      </div>
      <div className="grid grid-cols-[200px_1fr] flex-1 overflow-hidden">
        <div className="border-r border-white/5 bg-slate-900/60 p-3 space-y-2">
          {lists.map((list) => (
            <div key={list.id} className="rounded-lg bg-white/5 px-3 py-2 text-sm">
              {list.title}
            </div>
          ))}
        </div>
        <div className="relative overflow-auto">
          <div className="sticky top-0 grid grid-cols-14 bg-slate-900/80 text-xs uppercase text-white/60">
            {rangeDays.map((day) => (
              <div key={day.toISOString()} className="border-l border-white/5 px-2 py-2 text-center">
                {format(day, 'dd MMM', { locale: ru })}
              </div>
            ))}
          </div>
          <div className="divide-y divide-white/5">
            {lists.map((list) => (
              <div key={list.id} className="relative h-20 border-b border-white/5">
                {cards
                  .filter((c) => c.listId === list.id && c.dueDate)
                  .map((card) => {
                    const start = card.startDate ? new Date(card.startDate) : new Date();
                    const due = card.dueDate ? new Date(card.dueDate) : start;
                    const startIndex = Math.max(
                      0,
                      rangeDays.findIndex((d) => format(d, 'yyyy-MM-dd') === format(start, 'yyyy-MM-dd'))
                    );
                    const endIndex = Math.min(
                      rangeDays.length - 1,
                      rangeDays.findIndex((d) => format(d, 'yyyy-MM-dd') === format(due, 'yyyy-MM-dd'))
                    );
                    if (startIndex === -1 || endIndex === -1) return null;
                    const left = (startIndex / rangeDays.length) * 100;
                    const width = ((endIndex - startIndex + 1) / rangeDays.length) * 100;
                    const overdue = due.getTime() < Date.now();
                    return (
                      <div
                        key={card.id}
                        className={cn(
                          'absolute top-3 rounded-md px-3 py-2 text-xs font-semibold shadow',
                          overdue ? 'bg-red-500/80' : card.completed ? 'bg-emerald-500/80' : 'bg-sky-500/80'
                        )}
                        style={{ left: `${left}%`, width: `${width}%` }}
                      >
                        {card.title}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
