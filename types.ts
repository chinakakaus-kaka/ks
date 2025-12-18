export interface User {
  username: string;
  name: string;
  email: string;
  password: string; // In a real app, this would be hashed
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option (0-3)
  explanation: string; // For review mode
}

export interface ExamRecord {
  id: string;
  username: string;
  name: string;
  score: number;
  date: string;
  answers: Record<number, number>; // questionId -> selectedOptionIndex
  questionIds: number[]; // The specific questions asked in this session
}
