import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useBoardStore, selectBoard, selectCards } from '../store/useBoardStore';
import { addDays, format, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale';

const start = startOfWeek(new Date(), { weekStartsOn: 1 });
const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

export const CalendarView: React.FC = () => {
  const { boardId } = useParams();
  const board = useBoardStore(useMemo(() => selectBoard(boardId), [boardId]));
  const cards = useBoardStore(selectCards);

  if (!board) return null;

  return (
    <div className="flex h-full flex-col bg-slate-950 text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="text-lg font-semibold">Календарь</div>
        <div className="text-sm text-white/70">Неделя</div>
      </div>
      <div className="grid flex-1 grid-cols-7 gap-px bg-white/10 p-px">
        {days.map((day) => (
          <div key={day.toISOString()} className="relative bg-slate-900/80 p-3">
            <div className="mb-2 text-sm font-semibold">{format(day, 'EEE dd', { locale: ru })}</div>
            <div className="space-y-2">
              {cards
                .filter((c) => c.dueDate && format(new Date(c.dueDate), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                .map((card) => (
                  <div
                    key={card.id}
                    className="rounded-lg bg-sky-500/80 px-3 py-2 text-xs font-semibold shadow"
                  >
                    {card.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
