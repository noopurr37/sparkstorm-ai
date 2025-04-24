
import { Input } from "@/components/ui/input";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
}

export const FormField = ({ label, required, ...props }: FormFieldProps) => (
  <div>
    <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Input
      id={props.name}
      placeholder={`Your ${label.toLowerCase()}`}
      className="w-full"
      {...props}
    />
  </div>
);
