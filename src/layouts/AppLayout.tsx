import { Inbox, LayoutGrid, PanelsTopLeft, Search, Star, UserCircle } from 'lucide-react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useBoardStore, selectBoard } from '../store/useBoardStore';
import { Button } from '../components/ui/button';
import { useMemo } from 'react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { boardId } = useParams();
  const board = useBoardStore(useMemo(() => selectBoard(boardId), [boardId]));
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-white">
      <div className="flex items-center justify-between px-4 py-3 backdrop-blur-lg bg-slate-900/70 border-b border-white/5">
        <div className="flex items-center gap-3">
          <NavLink to="/boards" className="text-lg font-semibold flex items-center gap-2">
            <PanelsTopLeft className="h-5 w-5" /> Trello Premium
          </NavLink>
          <div className="hidden md:flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1">
            <Search className="h-4 w-4 text-white/60" />
            <input
              placeholder="Поиск ( / )"
              className="bg-transparent text-sm placeholder:text-white/60 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate('/planner')}>
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button variant="subtle" className="gap-2">
            <Star className="h-4 w-4" /> Создать
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full border border-white/10">
            <UserCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-white/5 backdrop-blur-sm lg:block">
          <div className="p-4 space-y-4">
            <div className="text-sm uppercase text-white/60">Inbox</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Уведомления</span>
                <span className="rounded-full bg-white/10 px-2 py-1 text-xs">3</span>
              </div>
              <p className="text-xs text-white/60">
                Быстрые действия с карточками, упоминаниями и комментариями.
              </p>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
      <div className="fixed bottom-3 left-1/2 z-50 w-[360px] -translate-x-1/2 rounded-full bg-white/10 px-3 py-2 backdrop-blur">
        <div className="flex items-center justify-between text-sm text-white/80">
          <NavLink
            to="/boards"
            className={({ isActive }) =>
              `flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-1 ${
                isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`
            }
          >
            <PanelsTopLeft className="h-4 w-4" /> Доски
          </NavLink>
          <NavLink
            to="/planner"
            className={({ isActive }) =>
              `flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-1 ${
                isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`
            }
          >
            <LayoutGrid className="h-4 w-4" /> Планировщик
          </NavLink>
          <button
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-1 ${
              location.pathname.startsWith('/b') ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
            onClick={() => navigate(board ? `/b/${board.id}` : '/boards')}
          >
            <Inbox className="h-4 w-4" /> Доска
          </button>
        </div>
      </div>
    </div>
  );
};
