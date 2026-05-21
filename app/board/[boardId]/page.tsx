import { BoardView } from '@/components/board/board-view';
export default function BoardPage({ params }: { params: { boardId: string } }) { return <BoardView boardId={params.boardId} />; }
