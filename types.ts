
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

export interface EatingJoint {
  id: string;
  name: string;
  emirate: string;
  address: string;
  lat: number;
  lng: number;
  specialty: string;
  image: string;
  tags: string[];
  rating: number;
  reviewsCount: number;
  contributor: string;
  createdAt: string;
}
