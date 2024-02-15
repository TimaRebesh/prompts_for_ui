'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react";
import { BuiltInProviderType } from 'next-auth/providers/index';

const LogIn = () => {

  const [providers, setProviders] = useState<
    Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null
  >(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const providersValues = useMemo(() => {
    return providers ? Object.values(providers) : null;
  }, [providers]);

  return (
    <div className="w-2/4 items-center justify-center">
      <section className="flex-col bg-slate-200 p-10 text-center gap-4 rounded-md">
        <div>
          {providersValues && providersValues.map((provider) => (
            <button
              key={provider.name}
              className="w-full px-2 py-2 cursor-pointer bg-white font-bold border-none rounded-lg"
              onClick={() => signIn(provider.id)}
            >{`Login with ${provider.name}`}</button>

          ))}
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

        </div>
      </section>
    </div>
  );
};

export default LogIn;