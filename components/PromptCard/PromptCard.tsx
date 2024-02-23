"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Prompt } from "next-auth";
import { ModalCard } from "./ModalCard";
import { usePathname } from "next/navigation";
import { Avatar } from "@components/FormElements/Avatar";

interface PCProps {
  prompt: Prompt;
  handleTagClick?: (tagName: string) => void;
  handleDelete: (prompt: Prompt) => void;
  handleEdit?: (post: Prompt) => void,
}

export const PromptCard = ({
  prompt,
  handleDelete,
  handleTagClick,
  handleEdit,
}: PCProps) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const [showCard, setShowCard] = useState(false);

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    setShowCard(true);
  };

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return <>
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Avatar src={prompt.creator?.image} alt='user_image' />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {prompt.creator?.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {prompt.creator?.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === prompt.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{
        prompt.prompt.length > 200 ? prompt.prompt.substring(0, 197) + '...' : prompt.prompt
      }</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>

      {(session?.user.isAdmin || pathName === "/my-profile") && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          {pathName === "/my-profile" &&
            <p
              className='font-inter text-sm green_gradient cursor-pointer'
              onClick={() => handleEdit && handleEdit(prompt)}
            >
              Edit
            </p>}
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={() => handleDelete(prompt)}
          >
            Delete
          </p>
        </div>
      )}

    </div>
    <ModalCard
      isOpen={showCard}
      onClose={() => setShowCard(false)}
      prompt={prompt}
    />
  </>;
};
