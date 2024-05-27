export interface Course {
  id: number;
  description: string;
  iconUrl: string;
  longDescription: string;
  lessonsCount?: number;
  category: string;
}
