'use client';

import Link from "next/link";
import { ProvidersButtons } from "./ProvidersButtons";
import { SubmitButton } from "@components/Buttons/Buttons";

const LogIn = () => {
  return (
    <section className="w-full max-w-full flex-center flex-col">
      <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <ProvidersButtons />
        <label>
          <span className="font-satoshi text-base text-gray-700">
            username
          </span>
          <input
            // value={post.tag}
            // onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="username"
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi text-gray-700">
            password
          </span>
          <input
            // value={post.tag}
            // onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="********"
            required
            className="form_input"
          />
        </label>
        <SubmitButton text="LogIn" onClick={() => { console.log('fired'); }} />
        <Link href="/register">
          {"Don't have an account?   "}
          <b className="blue_gradient">Register</b>
        </Link>
      </div>
    </section>

  );
};

export default LogIn;