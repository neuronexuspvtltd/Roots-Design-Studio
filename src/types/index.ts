export type ProjectStatus = 'published' | 'draft';

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  location?: string;
  year?: string;
  shortDescription: string;
  fullDescription: string;
  designConcept?: string;
  materials?: string[];
  coverImage: string;
  gallery: string[];
  featured: boolean;
  status: ProjectStatus;
  order: number;
  isDemo?: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  active: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  features?: string[];
  order: number;
  active: boolean;
  iconName?: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Consultation Scheduled' | 'Converted' | 'Closed';

export interface Enquiry {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  projectType: string;
  propertyType: string;
  location: string;
  budgetRange: string;
  preferredDate?: string;
  description: string;
  status: EnquiryStatus;
  internalNotes?: string;
  createdAt: number;
  updatedAt?: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  locationOrProject?: string;
  review: string;
  photoUrl?: string;
  status: 'published' | 'draft';
  createdAt: number;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  postUrl: string;
  caption?: string;
}

export interface SiteSettings {
  studioName: string;
  tagline: string;
  heroHeadline: string;
  heroSupportingText: string;
  heroImage: string;
  introHeadline: string;
  introCopy: string;
  introImage: string;
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  instagramPosts: InstagramPost[];
  footerAbout: string;
  copyrightNotice: string;
  updatedAt: number;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor';
}
