import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AssessmentResult } from '../types/assessment';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  level: number;
  xp: number;
  avatar?: string;
}

interface TestResult {
  logic: number;
  creativity: number;
  communication: number;
  discipline: number;
  teamwork: number;
  selfLearning: number;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
}

interface Chat {
  mentorId: number;
  messages: ChatMessage[];
}

interface AppState {
  user: User | null;
  testResult: TestResult | null;
  assessmentResult: AssessmentResult | null;
  preTestResult: TestResult | null;
  academicScores: Record<string, number> | null;
  savedCareers: string[];
  bookings: any[];
  progressLevel: number;
  theme: 'light' | 'dark';
  chats: Chat[];
  
  setUser: (user: User) => void;
  setTestResult: (result: TestResult) => void;
  setAssessmentResult: (result: AssessmentResult | null) => void;
  setPreTestResult: (result: TestResult) => void;
  setAcademicScores: (scores: Record<string, number> | null) => void;
  saveCareer: (id: string) => void;
  unsaveCareer: (id: string) => void;
  addBooking: (booking: any) => void;
  addXP: (amount: number) => void;
  toggleTheme: () => void;
  addChatMessage: (mentorId: number, message: ChatMessage) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      testResult: null,
      assessmentResult: null,
      preTestResult: null,
      academicScores: null,
      savedCareers: [],
      bookings: [],
      progressLevel: 0,
      theme: (new Date().getHours() >= 18 || new Date().getHours() < 6) ? 'dark' : 'light',
      chats: [],

      setUser: (user) => set({ user }),
      setTestResult: (testResult) => set({ testResult }),
      setAssessmentResult: (assessmentResult) => set({ assessmentResult }),
      setPreTestResult: (preTestResult) => set({ preTestResult }),
      setAcademicScores: (academicScores) => set({ academicScores }),
      saveCareer: (id) => set((state) => ({ 
        savedCareers: state.savedCareers.includes(id) ? state.savedCareers : [...state.savedCareers, id] 
      })),
      unsaveCareer: (id) => set((state) => ({ 
        savedCareers: state.savedCareers.filter(cid => cid !== id) 
      })),
      addBooking: (booking) => set((state) => ({ bookings: [...state.bookings, booking] })),
      addXP: (amount) => set((state) => {
        if (!state.user) return state;
        const newXP = state.user.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        return { user: { ...state.user, xp: newXP, level: newLevel } };
      }),
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        console.log('Toggling theme to:', newTheme);
        return { theme: newTheme };
      }),
      addChatMessage: (mentorId, message) => set((state) => {
        const existingChat = state.chats.find(c => c.mentorId === mentorId);
        if (existingChat) {
          return {
            chats: state.chats.map(c => 
              c.mentorId === mentorId 
                ? { ...c, messages: [...c.messages, message] }
                : c
            )
          };
        } else {
          return {
            chats: [...state.chats, { mentorId, messages: [message] }]
          };
        }
      }),
    }),
    {
      name: 'mentora-storage',
    }
  )
);
