export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Essay {
  title: string;
  subtitle: string;
  url: string;
  readTime: string;
}

export interface Prototype {
  name: string;
  tagline: string;
  description: string;
  url: string;
  repoUrl?: string;
  stack: string[];
  status: string;
}
