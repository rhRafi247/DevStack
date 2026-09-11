export type Category =
  | 'All'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Language'
  | 'Styling'
  | 'DevOps'
  | 'Tools';

export type Difficulty = 'Beginner-Friendly' | 'Intermediate' | 'Advanced';

export interface Technology {
  id: string;
  name: string;
  category: Category;
  description: string;
  icon: string;
  rating: number;
  difficulty: Difficulty;
  badge: string;
  badgeColor?: string;
}

export interface StackItem extends Technology {
  addedAt: number;
}
