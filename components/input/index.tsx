import { useFormContext } from "react-hook-form";

export enum InputType {
  Text = 'text',
  Date = 'date',
  Number = 'number'
}

interface Props {
  name: string;
  label: string;
  type: InputType;
}

export default function Input({ name, label, type }: Props) {
  const { register } = useFormContext();
  
  return (
    <div className="my-6">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        step="any"
        className="block w-full rounded-md bg-primary-50 border-transparent cursor-text focus:border-primary-800 focus:shadow-none focus:ring-primary-800"
        {...register(name)}
      />
    </div>
  );
}
