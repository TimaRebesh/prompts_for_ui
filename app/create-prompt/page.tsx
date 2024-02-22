"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PromptForm } from "@components/PromptForm/PromptForm";
import { PromptFormValues } from "@app/types";
import { useSessionExecution } from "@utils/hooks";
import { Preloader } from "@components/Preloader/Preloader";

const CreatePrompt = () => {

  const router = useRouter();
  const { session, isSessionLoading } = useSessionExecution({ redirectIfNoSession: true });

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState<PromptFormValues>({ prompt: "", tag: "" });

  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSessionLoading)
    return <Preloader />;

  return (
    <PromptForm
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt; 