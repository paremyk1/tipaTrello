import { Route, Routes, Navigate } from 'react-router-dom';
import { BoardsPage } from './BoardsPage';
import { BoardView } from './BoardView';
import { PlannerPage } from './PlannerPage';
import { TimelineView } from './TimelineView';
import { CalendarView } from './CalendarView';
import { AppLayout } from '../layouts/AppLayout';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/boards" replace />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/b/:boardId" element={<BoardView />} />
        <Route path="/b/:boardId/views/timeline" element={<TimelineView />} />
        <Route path="/b/:boardId/views/calendar" element={<CalendarView />} />
        <Route path="/b/:boardId/c/:cardId" element={<BoardView />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
