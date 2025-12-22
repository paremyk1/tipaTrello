import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBoardStore } from '../store/useBoardStore';
import { Button } from '../components/ui/button';

export const BoardsPage: React.FC = () => {
  const boards = useBoardStore((s) => s.boards);
  const toggleStar = useBoardStore((s) => s.toggleStar);
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Ваши доски</h1>
          <p className="text-white/70 text-sm">Премиум-опыт с видами, планировщиком и таймлайном.</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">Новая доска</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {boards.map((board) => (
          <button
            key={board.id}
            onClick={() => navigate(`/b/${board.id}`)}
            className="group relative h-32 overflow-hidden rounded-xl border border-white/10 bg-slate-800 text-left shadow-lg"
          >
            <img src={board.background} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
            <div className="relative flex h-full flex-col justify-between p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm text-white/70">{board.visibility === 'workspace' ? 'Рабочее пространство' : 'Приватная'}</div>
                  <div className="text-lg font-semibold leading-tight">{board.title}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStar(board.id);
                  }}
                  className={`rounded-full bg-black/40 p-2 text-white transition ${
                    board.isStarred ? 'text-yellow-400' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <Star className="h-4 w-4 fill-current" />
                </button>
              </div>
              {board.isPremium && (
                <div className="w-fit rounded-full bg-emerald-500/90 px-2 py-1 text-xs font-semibold text-black shadow">Premium</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
