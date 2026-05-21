'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useBoardStore } from '@/lib/store/board-store';

export default function HomePage() {
  const boards = useBoardStore((s) => s.boards);
  const setBoards = useBoardStore((s) => s.setBoards);
  useEffect(() => {
    window.electronAPI?.boards.list().then((data) => setBoards(data));
  }, [setBoards]);

  return <main className='p-8'><h1 className='text-2xl font-bold mb-4'>Workspaces</h1><div className='grid gap-4 grid-cols-3'>{boards.map((b)=><Link key={b.id} className='rounded-lg bg-white p-4 shadow' href={`/board/${b.id}`}>{b.title}</Link>)}</div></main>;
}
