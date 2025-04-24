
import { Mail, Phone, MapPin } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="glass-card p-8 h-full">
      <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
      
      <div className="space-y-6">
        <ContactInfoItem
          icon={<Mail className="w-5 h-5 text-blue-600" />}
          title="Email"
          content="ask@sparkstorm.ai"
        />
        
        <ContactInfoItem
          icon={<Phone className="w-5 h-5 text-blue-600" />}
          title="Phone"
          content="+1 (512) 337-2056"
        />
        
        <ContactInfoItem
          icon={<MapPin className="w-5 h-5 text-blue-600" />}
          title="Location"
          content={<>Austin, Texas<br />United States</>}
        />
      </div>
      
      <div className="mt-12">
        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
        <div className="flex space-x-4">
          <SocialLink
            href="#"
            aria-label="Twitter"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            }
          />
          <SocialLink
            href="#"
            aria-label="LinkedIn"
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
};

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const ContactInfoItem = ({ icon, title, content }: ContactInfoItemProps) => (
  <div className="flex items-start space-x-4">
    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
      <p className="text-gray-800">{content}</p>
    </div>
  </div>
);

interface SocialLinkProps {
  href: string;
  'aria-label': string;
  icon: React.ReactNode;
}

const SocialLink = ({ href, icon, ...props }: SocialLinkProps) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
    {...props}
  >
    {icon}
  </a>
);
