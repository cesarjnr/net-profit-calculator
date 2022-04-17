import { ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
  open: boolean;
  children: ReactNode;
  title?: string;
  onClose: () => void;
}

export default function Modal({ open, children, title, onClose }: Props) {
  const display = open ? 'block' : 'hidden';

  return (
    <div className={`${display} w-full h-full absolute left-0 top-0 bg-black/50 flex justify-center items-center`}>
      <div className="bg-white p-8 rounded shadow-md">
        <div className="flex gap-20 mb-5">
          {title && (
            <div className="grow flex items-center">
              <span className="text-xl font-bold">{title}</span>
            </div>
          )}

          <div className="grow flex justify-end">
            <button
              className="rounded-full p-2 hover:bg-primary-50"
              onClick={() => onClose()}
            >
              <MdClose size="1.5em" />
            </button>
          </div>
        </div>

        <div>
          {children}
        </div>
      </div>
    </div>
  );
}