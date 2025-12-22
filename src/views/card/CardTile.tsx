import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CheckSquare, Clock3, UserPlus } from 'lucide-react';
import { Board, Card } from '../../data/schema';
import { Badge } from '../../components/ui/badge';
import { useMemo, useState } from 'react';
import { members, labels } from '../../data/seed';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Dialog, DialogContent, DialogTrigger } from '../../components/ui/dialog';
import { CardDetail } from './CardDetail';
import { Button } from '../../components/ui/button';

interface Props {
  card: Card;
  board: Board;
}

export const CardTile: React.FC<Props> = ({ card, board }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: card.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const cardLabels = useMemo(() => labels.filter((l) => card.labels.includes(l.id)), [card.labels]);
  const cardMembers = useMemo(() => members.filter((m) => card.members.includes(m.id)), [card.members]);
  const [open, setOpen] = useState(false);

  const due = card.dueDate ? new Date(card.dueDate) : undefined;
  const isOverdue = due ? due.getTime() < Date.now() && !card.completed : false;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="group cursor-pointer space-y-2 rounded-lg bg-white text-slate-900 p-3 text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          {card.cover && (
            <div className="h-2 rounded-md" style={{ background: card.cover }} aria-hidden />
          )}
          <div className="space-y-1">
            <div className="flex flex-wrap gap-1">
              {cardLabels.map((label) => (
                <Badge key={label.id} color={label.color} className="text-[10px] uppercase tracking-wide">
                  {label.name}
                </Badge>
              ))}
            </div>
            <div className="text-sm font-semibold text-slate-900">{card.title}</div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
            {due && (
              <span
                className={`flex items-center gap-1 rounded px-2 py-1 ${
                  card.completed ? 'bg-emerald-100 text-emerald-700' : isOverdue ? 'bg-red-100 text-red-700' : 'bg-slate-100'
                }`}
              >
                <Clock3 className="h-3 w-3" />
                {format(due, 'd MMM', { locale: ru })}
              </span>
            )}
            {card.checklists.length > 0 && (
              <span className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1">
                <CheckSquare className="h-3 w-3" />
                {card.checklists[0].items.filter((i) => i.checked).length}/{card.checklists[0].items.length}
              </span>
            )}
            {cardMembers.length > 0 && (
              <span className="flex items-center gap-1">
                <UserPlus className="h-3 w-3" />
                {cardMembers.map((m) => (
                  <img
                    key={m.id}
                    src={m.avatar}
                    className="h-6 w-6 rounded-full border-2 border-white"
                    alt={m.name}
                  />
                ))}
              </span>
            )}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[88vh] overflow-hidden">
        <CardDetail card={card} board={board} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
