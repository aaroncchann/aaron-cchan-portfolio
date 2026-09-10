export type ActiveScreen =
  | 'home'
  | 'projects'
  | 'android'
  | 'flappy-ai'
  | 'about'
  | 'skills'
  | 'creative'
  | 'journey'
  | 'services'
  | 'contact';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'flappy';
  text: string;
  timestamp: string;
  type?: 'intro' | 'android-showcase' | 'project-spotlight' | 'contact-card' | 'general';
}

export interface AndroidProject {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  icon: string;
  badge: string;
  type: 'app' | 'game';
  accentColor: 'primary' | 'secondary' | 'tertiary';
}

export interface CreativeItem {
  id: string;
  title: string;
  format: string;
  placeholderText: string;
  status: string;
  icon: string;
  accentColor: 'primary' | 'secondary' | 'tertiary';
}

export interface Milestone {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: string;
  color: 'primary' | 'secondary' | 'pink';
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'primary' | 'secondary' | 'pink';
}

export interface SuggestedPrompt {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary';
}
