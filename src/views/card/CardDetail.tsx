import { Board, Card } from '../../data/schema';
import { members } from '../../data/seed';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { useBoardStore } from '../../store/useBoardStore';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Archive,
  CalendarDays,
  CheckSquare,
  ClipboardCopy,
  Copy,
  FilePlus,
  MoveRight,
  Palette,
  Plus,
  UserPlus,
} from 'lucide-react';

export const CardDetail: React.FC<{ card: Card; board: Board; onClose: () => void }> = ({ card, board, onClose }) => {
  const updateCard = useBoardStore((s) => s.updateCard);
  const list = useBoardStore((s) => s.lists.find((l) => l.id === card.listId));
  const due = card.dueDate ? new Date(card.dueDate) : null;

  return (
    <div className="grid grid-cols-3 gap-6 overflow-y-auto p-6">
      <div className="col-span-2 space-y-4">
        <input
          defaultValue={card.title}
          className="w-full bg-transparent text-2xl font-semibold text-white focus:outline-none"
        />
        <div className="flex flex-wrap gap-2 text-sm text-white/80">
          <span className="rounded bg-white/10 px-2 py-1">Список: {list?.title}</span>
          {card.completed && <span className="rounded bg-emerald-500/20 px-2 py-1 text-emerald-200">Выполнено</span>}
        </div>
        <div className="space-y-3 rounded-lg bg-white/5 p-4">
          <div className="text-sm font-semibold">Описание</div>
          <ReactMarkdown className="prose prose-invert prose-sm">{card.description || 'Расскажите подробнее...'}</ReactMarkdown>
          <Textarea
            placeholder="Обновить описание"
            onBlur={(e) => {
              updateCard({ ...card, description: e.currentTarget.value });
            }}
          />
        </div>
        {card.checklists.map((cl) => (
          <div key={cl.id} className="space-y-2 rounded-lg bg-white/5 p-4">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>{cl.title}</span>
              <Button size="sm" variant="ghost" className="text-xs">
                Добавить пункт
              </Button>
            </div>
            <div className="space-y-2">
              {cl.items.map((item) => (
                <label key={item.id} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked={item.checked} className="h-4 w-4 rounded" />
                  <span className={item.checked ? 'line-through text-white/60' : ''}>{item.text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <div className="space-y-3 rounded-lg bg-white/5 p-4">
          <div className="text-sm font-semibold">Активность</div>
          <div className="flex items-start gap-2">
            <img src={members[0].avatar} className="h-8 w-8 rounded-full" />
            <Textarea placeholder="Напишите комментарий" />
          </div>
          <div className="space-y-2 text-sm text-white/80">
            {card.comments.map((c) => (
              <div key={c.id} className="rounded bg-white/5 p-3">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{c.author}</span>
                  <span>{format(new Date(c.createdAt), 'd MMM, HH:mm', { locale: ru })}</span>
                </div>
                <div className="mt-1">{c.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="text-sm font-semibold text-white/80">Участники</div>
        <div className="flex flex-wrap gap-2">
          {members.map((m) => (
            <button key={m.id} className={`rounded-full border-2 ${card.members.includes(m.id) ? 'border-emerald-400' : 'border-transparent'}`}>
              <img src={m.avatar} className="h-10 w-10 rounded-full" />
            </button>
          ))}
          <Button variant="ghost" size="icon" className="rounded-full border border-white/10">
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <ActionButton icon={<UserPlus className="h-4 w-4" />} label="Участники" />
          <ActionButton icon={<Palette className="h-4 w-4" />} label="Метки" />
          <ActionButton icon={<CheckSquare className="h-4 w-4" />} label="Чеклист" />
          <ActionButton icon={<CalendarDays className="h-4 w-4" />} label="Даты" />
          <ActionButton icon={<FilePlus className="h-4 w-4" />} label="Вложение" />
          <ActionButton icon={<ClipboardCopy className="h-4 w-4" />} label="Копировать" />
          <ActionButton icon={<MoveRight className="h-4 w-4" />} label="Переместить" />
          <ActionButton icon={<Archive className="h-4 w-4" />} label="Архивировать" />
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10">
    <span className="flex items-center gap-2">{icon} {label}</span>
    <Plus className="h-4 w-4 text-white/50" />
  </button>
);
