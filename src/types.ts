export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string[];
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
}

export interface ProductItem {
  id: string;
  sku: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  description: string;
  content: string;
  weight: string;
  dimensions: string;
  availability: string;
  rating: number;
  specifications: Record<string, string>;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  date: string;
  content: string;
}
