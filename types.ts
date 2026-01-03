export interface TransformationPhase {
  id: string;
  label: string;
  image: string;
  subPhases?: { id: string; label: string; image: string }[];
}

export interface GalleryItem {
  id: number;
  name: string;
  status: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  description: string;
  videoUrl: string;
}

export interface ComparisonItem {
  id: number;
  title: string;
  category: string;
  before: string;
  after: string;
}