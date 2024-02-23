"use client";
import { useState, useEffect, ChangeEvent, useTransition } from "react";
import { PromptCard } from "../PromptCard/PromptCard";
import { Prompt } from "next-auth";
import { Preloader } from "@components/Preloader/Preloader";

const Feed = () => {

  const [allPrompts, setAllPrompts] = useState<Array<Prompt>>([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | undefined>(undefined);
  const [searchedResults, setSearchedResults] = useState<Prompt[]>([]);
  const [isFetchingPrompts, setFetchingPromptsTransitionStart] = useTransition();
  const [isDeleting, setDeletingTransitionStart] = useTransition();

  const fetchPosts = () => {
    setFetchingPromptsTransitionStart(async () => {
      const response = await fetch("/api/prompt",
        { cache: 'no-store' }
      );
      const data = await response.json();
      console.log(data);
      setAllPrompts(data);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i");
    return allPrompts.filter(
      (item) =>
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    const id = +setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
    setSearchTimeout(id);
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleDelete = (prompt: Prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      setDeletingTransitionStart(async () => {
        try {
          const response = await fetch(`/api/prompt/${prompt._id.toString()}`, {
            method: "DELETE",
          });
          if (response.ok) {
            const filteredPrompts = allPrompts.filter((item) => item._id !== prompt._id);
            setAllPrompts(filteredPrompts);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  };

  return (
    <section className='feed'>
      <div className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </div>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
          handleDelete={handleDelete}
        />
      ) : (
        <PromptCardList
          data={allPrompts}
          handleTagClick={handleTagClick}
          handleDelete={handleDelete}
        />
      )}
      {(isDeleting || isFetchingPrompts) && <Preloader />}
    </section>
  );
};

const PromptCardList = ({
  data,
  handleTagClick,
  handleDelete
}: {
  data: Array<Prompt>,
  handleTagClick: (tagName: string) => void;
  handleDelete: (prompt: Prompt) => void;
}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Feed;