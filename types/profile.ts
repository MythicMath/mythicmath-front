export interface ProfileResponse {
  userId: number;
  name: string;
  image: string | null;
  day_learning_streak: number;
  ranked_victories: number;
  xpCurrent: number;
  xpToNextLevel: number;
  level: number;
}
