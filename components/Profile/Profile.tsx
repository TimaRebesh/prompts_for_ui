import { Prompt } from "next-auth";
import { PromptCard } from "@components/PromptCard/PromptCard";
import { Preloader } from "@components/Preloader/Preloader";

interface ProfileProps {
  name: string,
  desc: string,
  data?: Prompt[],
  handleEdit: (post: Prompt) => void,
  handleDelete: (post: Prompt) => void,
}

export const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete
}: ProfileProps) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data ?
          data.map((post) => (
            <PromptCard
              key={post._id}
              prompt={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          )) :
          <Preloader />
        }
      </div>
    </section>
  );
};
