import { Prompt } from "next-auth";
import Image from "next/image";
import { useState } from "react";

export const ModalCard = ({
  isOpen,
  onClose,
  prompt
}: {
  isOpen: boolean,
  onClose: () => void,
  prompt: Prompt;
}) => {

  const [copied, setCopied] = useState("");

  const handleClose = () => {
    onClose();
  };

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg z-10 max-w-lg w-full relative">
        <Image
          src='/assets/icons/close.svg'
          width={30}
          height={30}
          className='absolute top-5 right-4 cursor-pointer'
          alt='close'
          onClick={handleClose}
        />
        <div className='flex justify-between items-start gap-5'>
          <div
            className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          >
            <Image
              src={prompt.creator?.image || `/assets/icons/noavatar.png`}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-contain'
            />

            <div className='flex flex-col'>
              <h3 className='font-satoshi font-semibold text-gray-900'>
                {prompt.creator?.username}
              </h3>
              <p className='font-inter text-sm text-gray-500'>
                {prompt.creator?.email}
              </p>
            </div>
          </div>
        </div>
        <p className='my-4 font-satoshi text-sm text-gray-700'>
          {prompt.prompt}
        </p>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleCopy}
          >{copied ? 'Copied' : 'Copy'}</button>
        </div>
      </div>
    </div>
  );

};

