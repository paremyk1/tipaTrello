export type Card = { id: string; title: string; description?: string };
export type List = { id: string; title: string; cards: Card[]; collapsed?: boolean };
export type Board = { id: string; title: string; lists: List[]; favorite?: boolean; background?: string };
