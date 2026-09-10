import { AndroidProject, CreativeItem, Milestone, ServiceItem, SuggestedPrompt } from '../types';

export const PORTFOLIO_INFO = {
  name: 'Aaron Cchan',
  role: 'AI Developer • Web & Android App Creator',
  location: 'Diphu, Assam',
  status: 'Open for projects & collaborations',
  email: 'amiraaronkhan@gmail.com',
  socialLinks: {
    github: 'https://github.com/aaroncchann',
    linkedin: 'https://www.linkedin.com/in/aaron-cchan-1361231ba/',
    instagram: 'https://www.instagram.com/aaron_cchan/',
    facebook: 'https://www.facebook.com/aaronccha/',
    twitter: 'https://x.com/amiraaronkhan',
    threads: 'https://www.threads.com/@aaron_cchan',
    youtube: 'https://www.youtube.com/@ToonGigglesTV',
  },
  heroImage: '/assets/profile-photo.jpg',
  profileImage: '/assets/profile-photo.jpg',
  philosophyQuote: 'I enjoy turning ideas into working digital products using modern development tools and AI. I build AI agents, custom chatbots, web applications, Android apps and games, while also exploring AI-powered creative tools for digital content.',
  bioPhilosophy: [
    {
      title: 'Personal Background',
      icon: 'account_circle',
      color: 'primary',
      description: "I'm Aaron Cchan, an AI developer and web & Android app creator based in Diphu, Assam. I enjoy exploring modern technology and turning ideas into practical digital experiences. My work includes AI agents and chatbots, web applications, Android apps, games, and AI-powered creative projects."
    },
    {
      title: 'Learning Journey',
      icon: 'trending_up',
      color: 'secondary',
      description: 'My development journey has been driven by hands-on experimentation and building real projects. I learn by exploring new tools and technologies, testing ideas, solving problems, and continuously improving what I create. Each project gives me an opportunity to understand something new and expand my skills across AI, web, Android, and creative technology.'
    },
    {
      title: 'Developer Philosophy',
      icon: 'lightbulb',
      color: 'primary',
      description: 'I believe technology is most valuable when it turns an idea into something useful. I focus on creating experiences that are practical, engaging, and easy to use while continuously experimenting with emerging AI and development technologies. I value curiosity, creativity, problem-solving, and learning through building.'
    },
    {
      title: 'Vision',
      icon: 'visibility',
      color: 'secondary',
      description: 'My goal is to continue exploring the intersection of AI, web, mobile, and creative technology while building increasingly useful digital products. I want to keep learning, experimenting, and turning ambitious ideas into experiences that people can actually use.'
    }
  ]
};

export const SKILL_CATEGORIES = [
  {
    category: 'Category 01',
    name: 'AI Development',
    icon: 'psychology',
    accent: 'primary',
    description: 'Building custom chatbots, autonomous agents, and AI-powered software workflows.',
    skills: [
      'AI Agents',
      'Custom AI Chatbots',
      'AI-powered Applications',
      'AI API Integration',
      'Prompt Engineering',
      'AI Workflows',
      'LLM Applications'
    ]
  },
  {
    category: 'Category 02',
    name: 'Web Development',
    icon: 'web',
    accent: 'secondary',
    description: 'Modern frontend, responsive web design, and full-stack web applications.',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'TypeScript',
      'Responsive Web Design',
      'Web Applications',
      'Full-Stack Web Applications'
    ]
  },
  {
    category: 'Category 03',
    name: 'Android Development',
    icon: 'android',
    accent: 'tertiary',
    description: 'Mobile applications and interactive games engineered for Android devices.',
    skills: [
      'Android Applications',
      'Android Games',
      'Full-Stack Android Applications',
      'API & Backend Integration',
      'App UI/UX',
      'Play Store Publishing Preparation'
    ]
  },
  {
    category: 'Category 04',
    name: 'AI & Digital Content',
    icon: 'auto_videocam',
    accent: 'primary',
    description: 'Creative exploration using modern AI tools for digital media and assets.',
    skills: [
      'AI-assisted Content Creation',
      'Video Content',
      'Image Creation',
      'Creative AI Tools',
      'Social Media Content'
    ]
  }
];

export const ANDROID_APPS: AndroidProject[] = [
  {
    id: 'emi-buddy',
    name: 'EMI Buddy',
    subtitle: 'EMI Calculator App',
    category: 'Android Apps',
    description: 'An Android app for calculating loan EMIs and helping users understand their repayment amounts.',
    icon: 'calculate',
    badge: 'Personal Project — Not yet published',
    type: 'app',
    accentColor: 'primary'
  },
  {
    id: 'help-sos',
    name: 'Help SOS',
    subtitle: 'Emergency Assistance App',
    category: 'Android Apps',
    description: 'An Android app that can send an emergency help message to family members when the user is in trouble.',
    icon: 'sos',
    badge: 'Personal Project — Not yet published',
    type: 'app',
    accentColor: 'secondary'
  },
  {
    id: 'notepad',
    name: 'Notepad',
    subtitle: 'Notes & Message Saving App',
    category: 'Android Apps',
    description: 'An Android app for saving important messages and notes for later access.',
    icon: 'edit_note',
    badge: 'Personal Project — Not yet published',
    type: 'app',
    accentColor: 'tertiary'
  },
  {
    id: 'screen-recorder',
    name: 'Screen Recorder',
    subtitle: 'Screen Recording App',
    category: 'Android Apps',
    description: "An Android app for recording the phone's screen.",
    icon: 'screen_record',
    badge: 'Personal Project — Not yet published',
    type: 'app',
    accentColor: 'primary'
  }
];

export const ANDROID_GAMES: AndroidProject[] = [
  {
    id: 'blueffy-bird',
    name: 'Blueffy Bird',
    subtitle: 'Arcade Game',
    category: '2D Arcade',
    description: 'An arcade-style Android game focused on simple, responsive gameplay.',
    icon: 'flutter',
    badge: 'Personal Project — Not yet published',
    type: 'game',
    accentColor: 'secondary'
  },
  {
    id: 'clash-of-fruit',
    name: 'Clash of Fruit',
    subtitle: 'Puzzle Game',
    category: '2D Puzzle',
    description: 'An Android puzzle game built around fruit-themed gameplay.',
    icon: 'nutrition',
    badge: 'Personal Project — Not yet published',
    type: 'game',
    accentColor: 'tertiary'
  }
];

export const CREATIVE_ITEMS: CreativeItem[] = [
  {
    id: 'creative-img',
    title: 'AI Image Creation & Visuals',
    format: 'Format: Image',
    placeholderText: 'Visual Media Showcase',
    status: 'In Production',
    icon: 'image',
    accentColor: 'primary'
  },
  {
    id: 'creative-vid',
    title: 'AI Video & Motion',
    format: 'Format: Video',
    placeholderText: 'Motion & Video Reel',
    status: 'In Production',
    icon: 'videocam',
    accentColor: 'secondary'
  },
  {
    id: 'creative-digital',
    title: 'Digital Content',
    format: 'Format: Digital Content',
    placeholderText: 'Digital Assets & Media',
    status: 'In Production',
    icon: 'category',
    accentColor: 'tertiary'
  },
  {
    id: 'creative-social',
    title: 'Social Media Content',
    format: 'Format: Social Media',
    placeholderText: 'Social Media Assets',
    status: 'In Production',
    icon: 'share',
    accentColor: 'primary'
  }
];

export const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    title: 'AI Agent & Chatbot Development',
    badge: 'Active Focus',
    description: 'Architecting autonomous LLM assistants, contextual memory pipelines, and tool-augmented conversational systems.',
    icon: 'psychology',
    color: 'primary'
  },
  {
    id: 'm2',
    title: 'Web Application Development',
    badge: 'Core Discipline',
    description: 'Engineering resilient full-stack architectures, ultra-responsive dynamic interfaces, and fluid user experiences.',
    icon: 'code',
    color: 'secondary'
  },
  {
    id: 'm3',
    title: 'Android App Development',
    badge: 'Production Track',
    description: 'Constructing native handheld applications optimized for performance, clean architecture, and offline-first utility.',
    icon: 'phone_android',
    color: 'primary'
  },
  {
    id: 'm4',
    title: 'Android Game Development',
    badge: 'Specialization',
    description: 'Developing interactive mobile gameplay mechanics, physics loops, and intuitive tactile touch controls.',
    icon: 'sports_esports',
    color: 'secondary'
  },
  {
    id: 'm5',
    title: 'AI-Powered Creative Projects',
    badge: 'Exploration & Craft',
    description: 'Experimenting at the intersection of generative AI, computational graphics, and interactive digital expressions.',
    icon: 'palette',
    color: 'pink'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: 'Custom AI Chatbots',
    description: 'Conversational bots tailored to your use case',
    icon: 'forum',
    color: 'primary'
  },
  {
    id: 's2',
    title: 'AI Agent Development',
    description: 'Task-oriented intelligence and automated workflows',
    icon: 'smart_toy',
    color: 'secondary'
  },
  {
    id: 's3',
    title: 'AI-Powered Web Applications',
    description: 'Integrating intelligent features into modern web apps',
    icon: 'auto_awesome_mosaic',
    color: 'primary'
  },
  {
    id: 's4',
    title: 'Website Development',
    description: 'Clean, responsive websites that load fast',
    icon: 'language',
    color: 'secondary'
  },
  {
    id: 's5',
    title: 'Android App Development',
    description: 'Mobile apps engineered for handheld utility',
    icon: 'devices',
    color: 'primary'
  },
  {
    id: 's6',
    title: 'Android Game Development',
    description: 'Engaging interactive mobile gameplay',
    icon: 'videogame_asset',
    color: 'secondary'
  },
  {
    id: 's7',
    title: 'AI-Assisted Digital Content',
    description: 'Creative digital media and visual assets',
    icon: 'brush',
    color: 'pink'
  }
];

export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  {
    id: 'p1',
    title: 'What types of AI agents and custom chatbots do you build?',
    subtitle: 'Conversational workflows, Flappy AI & prompt design',
    icon: 'smart_toy',
    color: 'primary'
  },
  {
    id: 'p2',
    title: 'Tell me about your Android apps and games.',
    subtitle: 'EMI Buddy, Help SOS, Notepad, Blueffy Bird & Clash of Fruit',
    icon: 'android',
    color: 'secondary'
  },
  {
    id: 'p3',
    title: 'What technologies do you use for web applications?',
    subtitle: 'Modern web frontend frameworks, APIs & cloud systems',
    icon: 'code',
    color: 'tertiary'
  },
  {
    id: 'p4',
    title: 'What featured projects has Aaron built?',
    subtitle: 'Flappy AI assistant, Android utilities & interactive games',
    icon: 'star',
    color: 'primary'
  },
  {
    id: 'p5',
    title: 'How can I get in touch to discuss a project?',
    subtitle: 'Collaboration, freelance contracts & remote availability',
    icon: 'mail',
    color: 'secondary'
  }
];
