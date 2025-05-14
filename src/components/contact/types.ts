
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface AITalkRequestFormData {
  name: string;
  email: string;
  organization: string;
  eventDate: string;
  audienceSize?: string;
  topic: string;
  additionalInfo?: string;
}
