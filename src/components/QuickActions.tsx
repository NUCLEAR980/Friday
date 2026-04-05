import React, { useState, useMemo } from 'react';
import { 
  Search, Cloud, Newspaper, Music, Play, Image, Film, Book, Plane, Hotel, 
  MapPin, Utensils, ShoppingCart, Package, TrendingUp, Coins, Trophy, Gamepad2, 
  Laugh, Quote, Sparkles, Dumbbell, Leaf, UtensilsCrossed, Wine, Dog, 
  Sprout, Car, Home, Shirt, Wand2,
  Code2, Terminal, PlayCircle, Bug, FileCode, Info, GitCommit, GitPullRequest,
  GitBranch, Container, Database, Globe, Smartphone, Palette, Atom, Coffee,
  Server, Gem, Wrench, FastForward, TestTube2, Gauge, ShieldCheck, BookOpen,
  PenTool, Rocket, ScrollText, Filter, X, ArrowUpCircle, ArrowDownCircle,
  Languages, MessageCircle, Mail, Type, AlarmClock, Timer, Hourglass, CalendarPlus,
  CheckSquare, Calculator, RefreshCw, Ruler, Globe2, BookMarked, Library,
  Volume2, Mic, FileText, Edit3, Table, FileEdit, Presentation, GitGraph,
  TimerReset, Wind, Headphones, Ban, History, Receipt, Signature, Contact2,
  SearchCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export type ActionCategory = 'All' | 'General' | 'Lifestyle' | 'Developer' | 'Tools';

export interface QuickAction {
  icon: React.ReactNode;
  label: string;
  description: string;
  prompt: string;
  color: string;
  category: ActionCategory;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { icon: <Search className="w-5 h-5" />, label: "Web Search", description: "Search the web.", prompt: "Search the web for: ", color: "bg-blue-500", category: 'General' },
  { icon: <Cloud className="w-5 h-5" />, label: "Weather Info", description: "Check the weather.", prompt: "What's the weather like today?", color: "bg-sky-400", category: 'General' },
  { icon: <Newspaper className="w-5 h-5" />, label: "Daily News", description: "Read top news.", prompt: "What are the top news headlines today?", color: "bg-red-500", category: 'General' },
  { icon: <Music className="w-5 h-5" />, label: "Play Music", description: "Play any song.", prompt: "Sing a song about: ", color: "bg-pink-500", category: 'Lifestyle' },
  { icon: <Play className="w-5 h-5" />, label: "Play Video", description: "Play YouTube videos.", prompt: "Play a video of: ", color: "bg-red-600", category: 'Lifestyle' },
  { icon: <Image className="w-5 h-5" />, label: "Find Images", description: "Search for pictures.", prompt: "Find some images of: ", color: "bg-purple-500", category: 'General' },
  { icon: <Film className="w-5 h-5" />, label: "Movie Info", description: "Find movie details.", prompt: "Tell me about the movie: ", color: "bg-orange-500", category: 'Lifestyle' },
  { icon: <Book className="w-5 h-5" />, label: "Book Info", description: "Find book details.", prompt: "Tell me about the book: ", color: "bg-amber-600", category: 'Lifestyle' },
  { icon: <Plane className="w-5 h-5" />, label: "Flight Info", description: "Check flight status.", prompt: "Check the status of flight: ", color: "bg-blue-600", category: 'General' },
  { icon: <Hotel className="w-5 h-5" />, label: "Hotel Search", description: "Find hotels.", prompt: "Find some good hotels in: ", color: "bg-indigo-500", category: 'Lifestyle' },
  { icon: <MapPin className="w-5 h-5" />, label: "Maps & Routes", description: "Find directions.", prompt: "Show me directions to: ", color: "bg-green-500", category: 'General' },
  { icon: <Utensils className="w-5 h-5" />, label: "Food Delivery", description: "Order food.", prompt: "Find food delivery options for: ", color: "bg-orange-400", category: 'Lifestyle' },
  { icon: <ShoppingCart className="w-5 h-5" />, label: "Shop Online", description: "Search products.", prompt: "Search for products: ", color: "bg-emerald-500", category: 'Lifestyle' },
  { icon: <Package className="w-5 h-5" />, label: "Track Package", description: "Track your order.", prompt: "Track my package with number: ", color: "bg-yellow-600", category: 'General' },
  { icon: <TrendingUp className="w-5 h-5" />, label: "Stock Prices", description: "Check stock market.", prompt: "What's the current stock price of: ", color: "bg-green-600", category: 'General' },
  { icon: <Coins className="w-5 h-5" />, label: "Crypto Prices", description: "Check crypto market.", prompt: "What's the current price of crypto: ", color: "bg-yellow-500", category: 'General' },
  { icon: <Trophy className="w-5 h-5" />, label: "Sports Scores", description: "Check live scores.", prompt: "What are the latest sports scores for: ", color: "bg-blue-700", category: 'Lifestyle' },
  { icon: <Gamepad2 className="w-5 h-5" />, label: "Game Info", description: "Find game details.", prompt: "Tell me about the game: ", color: "bg-indigo-600", category: 'Lifestyle' },
  { icon: <Laugh className="w-5 h-5" />, label: "Tell a Joke", description: "Hear a funny joke.", prompt: "Tell me a funny joke.", color: "bg-yellow-400", category: 'Lifestyle' },
  { icon: <Quote className="w-5 h-5" />, label: "Daily Quote", description: "Read a good quote.", prompt: "Give me an inspiring daily quote.", color: "bg-slate-500", category: 'Lifestyle' },
  { icon: <Sparkles className="w-5 h-5" />, label: "Meditation", description: "Guided meditation.", prompt: "Guide me through a short meditation.", color: "bg-teal-400", category: 'Lifestyle' },
  { icon: <Dumbbell className="w-5 h-5" />, label: "Workout Plan", description: "Get a workout plan.", prompt: "Create a workout plan for: ", color: "bg-zinc-700", category: 'Lifestyle' },
  { icon: <Leaf className="w-5 h-5" />, label: "Diet Plan", description: "Get a diet plan.", prompt: "Create a diet plan for: ", color: "bg-green-400", category: 'Lifestyle' },
  { icon: <UtensilsCrossed className="w-5 h-5" />, label: "Recipes", description: "Find cooking recipes.", prompt: "Find a recipe for: ", color: "bg-orange-600", category: 'Lifestyle' },
  { icon: <Wine className="w-5 h-5" />, label: "Wine Pairing", description: "Find good wine.", prompt: "What wine pairs well with: ", color: "bg-rose-700", category: 'Lifestyle' },
  { icon: <Dog className="w-5 h-5" />, label: "Pet Care", description: "Pet care tips.", prompt: "Give me some pet care tips for: ", color: "bg-amber-500", category: 'Lifestyle' },
  { icon: <Sprout className="w-5 h-5" />, label: "Plant Care", description: "Plant care tips.", prompt: "Give me some plant care tips for: ", color: "bg-green-500", category: 'Lifestyle' },
  { icon: <Car className="w-5 h-5" />, label: "Car Info", description: "Find car details.", prompt: "Tell me about the car: ", color: "bg-blue-800", category: 'Lifestyle' },
  { icon: <Home className="w-5 h-5" />, label: "Home Decor", description: "Home decor ideas.", prompt: "Give me some home decor ideas for: ", color: "bg-stone-500", category: 'Lifestyle' },
  { icon: <Shirt className="w-5 h-5" />, label: "Fashion Tips", description: "Get fashion advice.", prompt: "Give me some fashion advice for: ", color: "bg-pink-400", category: 'Lifestyle' },
  { icon: <Wand2 className="w-5 h-5" />, label: "Makeup Tips", description: "Get makeup advice.", prompt: "Give me some makeup tips for: ", color: "bg-fuchsia-500", category: 'Lifestyle' },
  
  // Developer Tools
  { icon: <Code2 className="w-5 h-5" />, label: "AI Coder", description: "Write code for you.", prompt: "Write code for: ", color: "bg-indigo-600", category: 'Developer' },
  { icon: <Terminal className="w-5 h-5" />, label: "VSCode Link", description: "Connect to VSCode.", prompt: "How do I connect F.R.I.D.A.Y. to VSCode?", color: "bg-blue-700", category: 'Developer' },
  { icon: <PlayCircle className="w-5 h-5" />, label: "Run Code", description: "Run code fast.", prompt: "Run this code: ", color: "bg-green-600", category: 'Developer' },
  { icon: <Bug className="w-5 h-5" />, label: "Fix Bugs", description: "Find and fix bugs.", prompt: "Find and fix bugs in this code: ", color: "bg-red-500", category: 'Developer' },
  { icon: <FileCode className="w-5 h-5" />, label: "Format Code", description: "Make code look good.", prompt: "Format this code: ", color: "bg-slate-600", category: 'Developer' },
  { icon: <Info className="w-5 h-5" />, label: "Explain Code", description: "Explain what code does.", prompt: "Explain this code: ", color: "bg-sky-500", category: 'Developer' },
  { icon: <GitCommit className="w-5 h-5" />, label: "Git Commit", description: "Auto git commit.", prompt: "Help me create a git commit message for: ", color: "bg-orange-500", category: 'Developer' },
  { icon: <ArrowUpCircle className="w-5 h-5" />, label: "Git Push", description: "Push code to GitHub.", prompt: "How do I push my code to GitHub?", color: "bg-orange-600", category: 'Developer' },
  { icon: <ArrowDownCircle className="w-5 h-5" />, label: "Git Pull", description: "Pull code from GitHub.", prompt: "How do I pull code from GitHub?", color: "bg-orange-400", category: 'Developer' },
  { icon: <GitBranch className="w-5 h-5" />, label: "Git Branch", description: "Make new branch.", prompt: "Help me manage my git branches for: ", color: "bg-orange-700", category: 'Developer' },
  { icon: <Container className="w-5 h-5" />, label: "Docker Helper", description: "Manage Docker.", prompt: "Help me with Docker for: ", color: "bg-blue-500", category: 'Developer' },
  { icon: <Database className="w-5 h-5" />, label: "DB Helper", description: "Manage databases.", prompt: "Help me with database queries for: ", color: "bg-indigo-500", category: 'Developer' },
  { icon: <Globe className="w-5 h-5" />, label: "API Tester", description: "Test APIs.", prompt: "Help me test this API: ", color: "bg-emerald-500", category: 'Developer' },
  { icon: <Smartphone className="w-5 h-5" />, label: "Mobile View", description: "Test mobile view.", prompt: "How can I test the mobile view of my app?", color: "bg-slate-700", category: 'Developer' },
  { icon: <Palette className="w-5 h-5" />, label: "CSS Helper", description: "Help with CSS.", prompt: "Help me with CSS for: ", color: "bg-pink-500", category: 'Developer' },
  { icon: <Atom className="w-5 h-5" />, label: "React Helper", description: "Help with React.", prompt: "Help me with React code for: ", color: "bg-sky-400", category: 'Developer' },
  { icon: <Code2 className="w-5 h-5" />, label: "Python Helper", description: "Help with Python.", prompt: "Help me with Python code for: ", color: "bg-blue-600", category: 'Developer' },
  { icon: <Coffee className="w-5 h-5" />, label: "Java Helper", description: "Help with Java.", prompt: "Help me with Java code for: ", color: "bg-orange-800", category: 'Developer' },
  { icon: <ScrollText className="w-5 h-5" />, label: "JS Helper", description: "Help with JavaScript.", prompt: "Help me with JavaScript code for: ", color: "bg-yellow-500", category: 'Developer' },
  { icon: <Server className="w-5 h-5" />, label: "PHP Helper", description: "Help with PHP.", prompt: "Help me with PHP code for: ", color: "bg-indigo-400", category: 'Developer' },
  { icon: <Gem className="w-5 h-5" />, label: "Ruby Helper", description: "Help with Ruby.", prompt: "Help me with Ruby code for: ", color: "bg-red-600", category: 'Developer' },
  { icon: <Wrench className="w-5 h-5" />, label: "Rust Helper", description: "Help with Rust.", prompt: "Help me with Rust code for: ", color: "bg-orange-600", category: 'Developer' },
  { icon: <FastForward className="w-5 h-5" />, label: "Go Helper", description: "Help with Go.", prompt: "Help me with Go code for: ", color: "bg-cyan-500", category: 'Developer' },
  { icon: <TestTube2 className="w-5 h-5" />, label: "Write Tests", description: "Write code tests.", prompt: "Write tests for this code: ", color: "bg-green-500", category: 'Developer' },
  { icon: <Gauge className="w-5 h-5" />, label: "Check Speed", description: "Check code speed.", prompt: "Analyze the performance of this code: ", color: "bg-yellow-600", category: 'Developer' },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Check Security", description: "Check code security.", prompt: "Check this code for security vulnerabilities: ", color: "bg-red-700", category: 'Developer' },
  { icon: <BookOpen className="w-5 h-5" />, label: "Read Docs", description: "Read code docs.", prompt: "Help me understand the documentation for: ", color: "bg-blue-400", category: 'Developer' },
  { icon: <PenTool className="w-5 h-5" />, label: "Write Docs", description: "Write code docs.", prompt: "Write documentation for this code: ", color: "bg-slate-500", category: 'Developer' },
  { icon: <Rocket className="w-5 h-5" />, label: "Deploy App", description: "Deploy your app.", prompt: "Help me deploy my application to: ", color: "bg-indigo-600", category: 'Developer' },
  { icon: <Cloud className="w-5 h-5" />, label: "AWS Helper", description: "Help with AWS.", prompt: "Help me with AWS services for: ", color: "bg-orange-500", category: 'Developer' },
  { icon: <Terminal className="w-5 h-5" />, label: "Linux Commands", description: "Run Linux commands.", prompt: "What is the Linux command for: ", color: "bg-zinc-800", category: 'Developer' },

  // Tools & Utilities
  { icon: <Languages className="w-5 h-5" />, label: "Any Language", description: "Speak & understand any language.", prompt: "I want to speak and understand: ", color: "bg-indigo-500", category: 'Tools' },
  { icon: <MessageCircle className="w-5 h-5" />, label: "WhatsApp Bot", description: "Send auto messages.", prompt: "Draft a WhatsApp message for: ", color: "bg-green-500", category: 'Tools' },
  { icon: <Mail className="w-5 h-5" />, label: "Email Sender", description: "Send emails fast.", prompt: "Draft an email to: ", color: "bg-blue-500", category: 'Tools' },
  { icon: <Type className="w-5 h-5" />, label: "Auto Typing", description: "Type text for you.", prompt: "Type the following text for me: ", color: "bg-slate-500", category: 'Tools' },
  { icon: <AlarmClock className="w-5 h-5" />, label: "Set Alarm", description: "Set a wake up alarm.", prompt: "Set an alarm for: ", color: "bg-red-500", category: 'Tools' },
  { icon: <Timer className="w-5 h-5" />, label: "Stopwatch", description: "Start a stopwatch.", prompt: "Start a stopwatch.", color: "bg-orange-500", category: 'Tools' },
  { icon: <Hourglass className="w-5 h-5" />, label: "Timer", description: "Set a countdown timer.", prompt: "Set a timer for: ", color: "bg-amber-500", category: 'Tools' },
  { icon: <CalendarPlus className="w-5 h-5" />, label: "Add Event", description: "Add to calendar.", prompt: "Add an event to my calendar: ", color: "bg-blue-600", category: 'Tools' },
  { icon: <CheckSquare className="w-5 h-5" />, label: "To-Do List", description: "Manage your tasks.", prompt: "Add this to my to-do list: ", color: "bg-emerald-600", category: 'Tools' },
  { icon: <Calculator className="w-5 h-5" />, label: "Calculator", description: "Do math fast.", prompt: "Calculate: ", color: "bg-zinc-600", category: 'Tools' },
  { icon: <RefreshCw className="w-5 h-5" />, label: "Currency Converter", description: "Convert money.", prompt: "Convert currency: ", color: "bg-green-600", category: 'Tools' },
  { icon: <Ruler className="w-5 h-5" />, label: "Unit Converter", description: "Convert lengths/weights.", prompt: "Convert units: ", color: "bg-blue-400", category: 'Tools' },
  { icon: <Globe2 className="w-5 h-5" />, label: "Translate Text", description: "Translate languages.", prompt: "Translate this to [Language]: ", color: "bg-sky-500", category: 'Tools' },
  { icon: <BookMarked className="w-5 h-5" />, label: "Dictionary", description: "Find word meanings.", prompt: "Define the word: ", color: "bg-indigo-400", category: 'Tools' },
  { icon: <Library className="w-5 h-5" />, label: "Thesaurus", description: "Find similar words.", prompt: "Find synonyms for: ", color: "bg-purple-400", category: 'Tools' },
  { icon: <Volume2 className="w-5 h-5" />, label: "Text to Speech", description: "Read text out loud.", prompt: "Read this text out loud: ", color: "bg-pink-500", category: 'Tools' },
  { icon: <Mic className="w-5 h-5" />, label: "Speech to Text", description: "Type by talking.", prompt: "Transcribe my speech: ", color: "bg-red-400", category: 'Tools' },
  { icon: <FileText className="w-5 h-5" />, label: "PDF Reader", description: "Read PDF files.", prompt: "Help me read this PDF: ", color: "bg-red-600", category: 'Tools' },
  { icon: <Edit3 className="w-5 h-5" />, label: "PDF Editor", description: "Edit PDF files.", prompt: "Help me edit this PDF: ", color: "bg-orange-600", category: 'Tools' },
  { icon: <Table className="w-5 h-5" />, label: "Excel Helper", description: "Help with Excel.", prompt: "Help me with this Excel task: ", color: "bg-green-700", category: 'Tools' },
  { icon: <FileEdit className="w-5 h-5" />, label: "Word Helper", description: "Help with Word.", prompt: "Help me with this Word document: ", color: "bg-blue-700", category: 'Tools' },
  { icon: <Presentation className="w-5 h-5" />, label: "PPT Helper", description: "Help with PowerPoint.", prompt: "Help me with this PowerPoint presentation: ", color: "bg-orange-700", category: 'Tools' },
  { icon: <GitGraph className="w-5 h-5" />, label: "Mind Map", description: "Make mind maps.", prompt: "Create a mind map for: ", color: "bg-purple-600", category: 'Tools' },
  { icon: <TimerReset className="w-5 h-5" />, label: "Pomodoro Timer", description: "Focus timer.", prompt: "Start a Pomodoro timer.", color: "bg-red-500", category: 'Tools' },
  { icon: <Wind className="w-5 h-5" />, label: "Relax Mode", description: "Play calm sounds.", prompt: "Play some relaxing sounds.", color: "bg-teal-500", category: 'Tools' },
  { icon: <Headphones className="w-5 h-5" />, label: "Focus Music", description: "Play focus music.", prompt: "Play some focus music.", color: "bg-indigo-600", category: 'Tools' },
  { icon: <Ban className="w-5 h-5" />, label: "Block Distractions", description: "Block bad sites.", prompt: "How can I block distractions while working?", color: "bg-zinc-900", category: 'Tools' },
  { icon: <History className="w-5 h-5" />, label: "Track Time", description: "Track work time.", prompt: "Start tracking my time for: ", color: "bg-slate-700", category: 'Tools' },
  { icon: <Receipt className="w-5 h-5" />, label: "Make Invoice", description: "Create bills.", prompt: "Create an invoice for: ", color: "bg-emerald-500", category: 'Tools' },
  { icon: <Signature className="w-5 h-5" />, label: "Sign Doc", description: "Sign documents.", prompt: "Help me sign this document.", color: "bg-blue-500", category: 'Tools' },
  { icon: <Contact2 className="w-5 h-5" />, label: "Contacts", description: "Manage contacts.", prompt: "Manage my contacts: ", color: "bg-amber-600", category: 'Tools' },
  { icon: <SearchCode className="w-5 h-5" />, label: "Find Text", description: "Find text in images.", prompt: "Find text in this image: ", color: "bg-indigo-700", category: 'Tools' },
];

interface QuickActionsProps {
  onAction: (prompt: string) => void;
  theme: 'dark' | 'light';
}

export function QuickActions({ onAction, theme }: QuickActionsProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ActionCategory>('All');

  const filteredActions = useMemo(() => {
    return QUICK_ACTIONS.filter(action => {
      const matchesSearch = action.label.toLowerCase().includes(search.toLowerCase()) || 
                           action.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || action.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const categories: ActionCategory[] = ['All', 'General', 'Lifestyle', 'Developer', 'Tools'];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Search and Filters Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className={`relative w-full md:w-72 group`}>
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${theme === 'dark' ? 'text-white/20 group-focus-within:text-friday-cyan' : 'text-black/20 group-focus-within:text-indigo-600'}`} />
            <input
              type="text"
              placeholder="FILTER PROTOCOLS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-12 pr-10 py-3 rounded-2xl text-[10px] tracking-[0.2em] font-mono outline-none transition-all ${
                theme === 'dark' 
                  ? 'bg-white/5 border border-white/10 text-white focus:bg-white/10 focus:border-friday-cyan/50' 
                  : 'bg-black/5 border border-black/10 text-black focus:bg-black/10 focus:border-indigo-500/50'
              }`}
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className={`w-4 h-4 ${theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-black/20 hover:text-black'}`} />
              </button>
            )}
          </div>

          <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/5 overflow-x-auto no-scrollbar">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-xl text-[10px] font-mono tracking-[0.2em] uppercase transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-white/10 text-friday-cyan shadow-[0_0_20px_rgba(0,255,255,0.2)] border border-white/10'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 min-h-[400px]"
      >
        <AnimatePresence>
          {filteredActions.map((action) => (
            <motion.button
              variants={item}
              key={action.label}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => onAction(action.prompt)}
              className={`group relative flex flex-col items-start gap-4 p-6 rounded-[32px] transition-all hover:scale-[1.02] active:scale-[0.98] liquid-glass border border-white/5 hover:border-white/20 overflow-hidden ${
                theme === 'dark' ? 'bg-white/5' : 'bg-black/5 shadow-sm'
              }`}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${theme === 'light' ? 'from-black/5' : ''}`} />
              
              <div className={`relative p-3.5 rounded-2xl text-white ${action.color} shadow-[0_10px_20px_rgba(0,0,0,0.3)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] transition-all group-hover:-translate-y-1`}>
                {action.icon}
              </div>

              <div className="relative flex flex-col items-start text-left">
                <span className={`text-xs font-medium tracking-[0.15em] uppercase ${theme === 'dark' ? 'text-white/90' : 'text-gray-800'}`}>
                  {action.label}
                </span>
                <p className={`text-[10px] mt-1.5 leading-relaxed opacity-40 font-light ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                  {action.description}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full transition-colors ${theme === 'dark' ? 'bg-white/5 group-hover:bg-friday-cyan/40' : 'bg-black/5 group-hover:bg-indigo-500/40'}`} />
            </motion.button>
          ))}
        </AnimatePresence>
        
        {filteredActions.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-24 flex flex-col items-center justify-center gap-4"
          >
            <div className={`w-12 h-12 rounded-full border flex items-center justify-center opacity-20 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
              <Search className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} />
            </div>
            <p className={`text-xs tracking-[0.3em] uppercase font-mono ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
              No matching protocols found
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
