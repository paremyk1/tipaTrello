import { Board } from '@/lib/types/domain';
declare global {
  interface Window { electronAPI?: { boards: { list: () => Promise<Board[]> } } }
}
export {};
