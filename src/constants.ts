import { 
  Languages, MessageSquare, Mail, Type, AlarmClock, Timer, Hourglass, 
  Calendar, CheckSquare, Calculator, Banknote, Ruler, Globe, Book, 
  Library, Volume2, Mic, FileText, Edit3, FileSpreadsheet, FileBox, 
  Presentation, Brain, Wind, Music, ShieldAlert, Clock, 
  FileSignature, Contact, ScanText, Search, Target
} from "lucide-react";
import { Tool } from "./types";

export const TOOLS: Tool[] = [
  // AI & Language
  { id: "ai-assistant", name: "Any Language", description: "Speak & understand any language in the world.", icon: Languages, category: "AI & Language", color: "blue" },
  { id: "translate", name: "Translate Text", description: "Translate between 100+ languages.", icon: Globe, category: "AI & Language", color: "blue" },
  { id: "dictionary", name: "Dictionary", description: "Find word meanings and usage.", icon: Book, category: "AI & Language", color: "blue" },
  { id: "thesaurus", name: "Thesaurus", description: "Find synonyms and antonyms.", icon: Library, category: "AI & Language", color: "blue" },
  { id: "tts", name: "Text to Speech", description: "Read text out loud with AI voices.", icon: Volume2, category: "AI & Language", color: "blue" },
  { id: "stt", name: "Speech to Text", description: "Type by talking with high accuracy.", icon: Mic, category: "AI & Language", color: "blue" },
  { id: "auto-typing", name: "Auto Typing", description: "Generate and type text automatically.", icon: Type, category: "AI & Language", color: "blue" },

  // Communication
  { id: "whatsapp-bot", name: "WhatsApp Bot", description: "Draft and send automated messages.", icon: MessageSquare, category: "Communication", color: "green" },
  { id: "email-sender", name: "Email Sender", description: "Send emails fast and securely.", icon: Mail, category: "Communication", color: "green" },

  // Time & Focus
  { id: "alarm", name: "Set Alarm", description: "Set wake up alarms with custom sounds.", icon: AlarmClock, category: "Time & Focus", color: "orange" },
  { id: "stopwatch", name: "Stopwatch", description: "Precise time tracking with laps.", icon: Timer, category: "Time & Focus", color: "orange" },
  { id: "timer", name: "Timer", description: "Set countdown timers for tasks.", icon: Hourglass, category: "Time & Focus", color: "orange" },
  { id: "pomodoro", name: "Pomodoro Timer", description: "Focus timer for deep work sessions.", icon: Target, category: "Time & Focus", color: "orange" },
  { id: "track-time", name: "Track Time", description: "Track work time and productivity.", icon: Clock, category: "Time & Focus", color: "orange" },
  { id: "block-distractions", name: "Block Distractions", description: "Stay focused by blocking bad sites.", icon: ShieldAlert, category: "Time & Focus", color: "orange" },

  // Organization
  { id: "calendar", name: "Add Event", description: "Manage your calendar events.", icon: Calendar, category: "Organization", color: "purple" },
  { id: "todo", name: "To-Do List", description: "Manage your daily tasks and goals.", icon: CheckSquare, category: "Organization", color: "purple" },
  { id: "contacts", name: "Contacts", description: "Manage and organize your contacts.", icon: Contact, category: "Organization", color: "purple" },

  // Utilities
  { id: "calculator", name: "Calculator", description: "Perform complex math calculations.", icon: Calculator, category: "Utilities", color: "gray" },
  { id: "currency", name: "Currency Converter", description: "Real-time money conversion.", icon: Banknote, category: "Utilities", color: "gray" },
  { id: "unit-converter", name: "Unit Converter", description: "Convert lengths, weights, and more.", icon: Ruler, category: "Utilities", color: "gray" },

  // Documents & Media
  { id: "pdf-reader", name: "PDF Reader", description: "View and read PDF documents.", icon: FileText, category: "Documents & Media", color: "red" },
  { id: "pdf-editor", name: "PDF Editor", description: "Edit and annotate PDF files.", icon: Edit3, category: "Documents & Media", color: "red" },
  { id: "ocr", name: "Find Text", description: "Extract text from images using AI.", icon: ScanText, category: "Documents & Media", color: "red" },
  { id: "sign-doc", name: "Sign Doc", description: "Digitally sign your documents.", icon: FileSignature, category: "Documents & Media", color: "red" },
  { id: "invoice", name: "Make Invoice", description: "Create professional bills and invoices.", icon: FileBox, category: "Documents & Media", color: "red" },
  { id: "excel-helper", name: "Excel Helper", description: "AI assistance for spreadsheets.", icon: FileSpreadsheet, category: "Documents & Media", color: "red" },
  { id: "word-helper", name: "Word Helper", description: "AI assistance for documents.", icon: FileText, category: "Documents & Media", color: "red" },
  { id: "ppt-helper", name: "PPT Helper", description: "AI assistance for presentations.", icon: Presentation, category: "Documents & Media", color: "red" },

  // Creativity & Wellbeing
  { id: "mind-map", name: "Mind Map", description: "Visualize your ideas and projects.", icon: Brain, category: "Creativity & Wellbeing", color: "pink" },
  { id: "relax-mode", name: "Relax Mode", description: "Play calm and soothing sounds.", icon: Wind, category: "Creativity & Wellbeing", color: "pink" },
  { id: "focus-music", name: "Focus Music", description: "Play music designed for focus.", icon: Music, category: "Creativity & Wellbeing", color: "pink" },
];
