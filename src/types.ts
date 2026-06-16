export type UpdateCategory = "all" | "recruitment" | "scheme" | "education" | "admitcard" | "result" | "tech" | "tourism" | "examprep";

export interface UpdateItem {
  id: string;
  category: "recruitment" | "scheme" | "education" | "admitcard" | "result" | "tech" | "tourism" | "examprep";
  title: string;
  titleAs: string; // Assamese translation
  status: "Active" | "Upcoming" | "Completed" | "New" | "Notification Out";
  publishedDate: string;
  details: string;
  detailsAs: string;
  eligibility: string[];
  eligibilityAs: string[];
  benefits?: string;
  benefitsAs?: string;
  howToApply: string[];
  howToApplyAs: string[];
  syllabus?: string[];
  syllabusAs?: string[];
  officialLink?: string;
  tourismSpots?: { name: string; desc: string; bestTime: string }[];
  examTips?: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionAs: string;
  options: string[];
  optionsAs: string[];
  answerIndex: number;
  explanation: string;
  explanationAs: string;
}
