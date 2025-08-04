// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Surf Post interface
export interface SurfPost extends CosmicObject {
  type: 'surf-posts';
  metadata: {
    title?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    surf_spot?: string;
    wave_height?: string;
    wind_conditions?: {
      key: WindCondition;
      value: string;
    };
    surf_rating?: {
      key: SurfRating;
      value: string;
    };
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// Author interface  
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    years_surfing?: number;
    favorite_spot?: string;
  };
}

// Type literals for select-dropdown values
export type WindCondition = 'offshore' | 'onshore' | 'cross-shore' | 'light';
export type SurfRating = 'poor' | 'fair' | 'good' | 'excellent' | 'epic';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards
export function isSurfPost(obj: CosmicObject): obj is SurfPost {
  return obj.type === 'surf-posts';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

// Utility functions
export function getSurfRatingColor(rating: SurfRating): string {
  switch (rating) {
    case 'poor': return 'text-red-600';
    case 'fair': return 'text-orange-600';
    case 'good': return 'text-yellow-600';
    case 'excellent': return 'text-green-600';
    case 'epic': return 'text-purple-600';
    default: return 'text-gray-600';
  }
}

export function getCategoryColor(color?: string): string {
  if (!color) return '#3B82F6';
  return color;
}