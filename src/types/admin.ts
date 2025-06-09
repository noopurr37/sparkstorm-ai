
export interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface AITalkRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organization: string;
  event_date: string;
  audience_size?: string;
  topic: string;
  additional_info?: string;
}

export interface ConsultationRequest {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company?: string;
  topic: string;
  message?: string;
}

export interface WaitlistEntry {
  id: string;
  created_at: string;
  name?: string;
  email: string;
}

export interface NewsletterSubscription {
  id: number;
  created_at: string;
  email: string;
}

export interface AdminData {
  contactSubmissions: ContactSubmission[];
  aiTalkRequests: AITalkRequest[];
  consultationRequests: ConsultationRequest[];
  waitlistEntries: WaitlistEntry[];
  newsletterSubscriptions: NewsletterSubscription[];
}
