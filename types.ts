
export interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  color: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
