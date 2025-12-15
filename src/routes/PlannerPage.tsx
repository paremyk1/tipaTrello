import { useBoardStore } from '../store/useBoardStore';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { ru } from 'date-fns/locale';
import { members } from '../data/seed';
import { Button } from '../components/ui/button';

const hours = Array.from({ length: 10 }, (_, i) => 9 + i);

export const PlannerPage: React.FC = () => {
  const blocks = useBoardStore((s) => s.scheduled);
  const cards = useBoardStore((s) => s.cards);
  const board = useBoardStore((s) => s.boards[0]);

  const byDate = useMemo(() => blocks.filter((b) => format(new Date(b.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')), [blocks]);

  return (
    <div className="grid h-full grid-cols-3 gap-4 p-6">
      <div className="col-span-2 rounded-xl bg-white/5 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-white/70">Планировщик</div>
            <div className="text-2xl font-semibold">Сегодня — {format(new Date(), 'd MMM, EEEE', { locale: ru })}</div>
          </div>
          <Button className="bg-sky-600">Подключить календарь</Button>
        </div>
        <div className="relative mt-6 h-[640px] overflow-hidden rounded-lg bg-slate-950/80">
          <div className="absolute inset-y-0 left-16 right-4">
            {byDate.map((block) => {
              const top = ((block.startMinutes - 9 * 60) / (9 * 60)) * 100;
              const height = (block.durationMinutes / (9 * 60)) * 100;
              const card = block.cardId ? cards.find((c) => c.id === block.cardId) : undefined;
              return (
                <div
                  key={block.id}
                  className={`absolute left-0 right-0 rounded-lg border border-white/10 bg-sky-500/30 p-3 text-sm backdrop-blur`}
                  style={{ top: `${top}%`, height: `${height}%` }}
                >
                  <div className="text-xs text-white/70">{block.source === 'google' ? 'Google' : 'Карточка'}</div>
                  <div className="font-semibold">{block.title || card?.title}</div>
                </div>
              );
            })}
          </div>
          <div className="absolute inset-0 grid grid-cols-[64px_1fr] text-xs text-white/60">
            <div className="space-y-10 pt-6">
              {hours.map((h) => (
                <div key={h}>{h}:00</div>
              ))}
            </div>
            <div className="border-l border-white/5" />
          </div>
        </div>
        <p className="mt-3 text-sm text-white/60">Ваш планировщик виден только вам.</p>
      </div>
      <div className="rounded-xl bg-white/5 p-4 text-white">
        <div className="mb-3 text-sm font-semibold">Карточки</div>
        <div className="space-y-2">
          {cards.slice(0, 6).map((card) => (
            <div key={card.id} className="rounded-lg bg-white/10 p-3 text-sm">
              <div className="font-semibold">{card.title}</div>
              <div className="text-white/70">{members.find((m) => card.members.includes(m.id))?.name || 'Без участника'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
