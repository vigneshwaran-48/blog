"use client";

import React, { ChangeEvent, useState } from 'react';

const Page = () => {

    const [form, setForm] = useState({
      profileId: "",
      description: ""
    });

    const handleFormChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm(prevForm => {
        return {...prevForm, [name]: value};
      });
    }
    return (
        <div className="flex w-full h-full p-2">
          <div className="bg-black max-w-[500px] w-full rounded-md"></div>
          <div className="flex flex-col w-full p-2">
            <h1 className="text-2xl font-bold my-2">Welcome, You are close to Setup your account</h1>
            <form className="flex flex-col py-2">  
              <label className="relative my-[10px]">
                <p className="absolute top-[-15%] left-[4%] font-bold text-[--app-light-text-color] bg-[--app-background-color]">Profile Id</p>
                <input className="w-full border max-w-[260px]  p-2 rounded outline-none" name="profileId" value={form.profileId} onChange={handleFormChange} />
              </label>
              <label className="relative my-[10px]">
                <p className="absolute top-[-15%] left-[4%] font-bold text-[--app-light-text-color] bg-[--app-background-color]">Description</p>
                <textarea className="w-full h-full border max-w-[300px] resize-y p-2 rounded outline-none" name="description" value={form.description} onChange={handleFormChange} />
              </label>
            </form>
          </div>
        </div>
    )
}

export default Page;
