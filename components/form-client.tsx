"use client";

import React, { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface FormClientProps {
  name: string;
  onSubmit: (data: any) => void;
}

const FormClient: React.FC<FormClientProps> = ({ name, onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-lg">
      <div className="flex flex-col gap-4">
        {name === "login" ? (
          <>
            <Label htmlFor="email" className="text-gray-800">
              Email
            </Label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <Label htmlFor="password" className="text-gray-800">
              Password
            </Label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </>
        ) : (
          <>
            <Label htmlFor="firstName" className="text-gray-800">
              First Name
            </Label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <Label htmlFor="lastName" className="text-gray-800">
              Last Name
            </Label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <Label htmlFor="email" className="text-gray-800">
              Email
            </Label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <Label htmlFor="password" className="text-gray-800">
              Password
            </Label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 rounded border border-gray-300 text-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </>
        )}
      </div>
      <Button
        type="submit"
        variant={"primary"}
        className="w-full mt-6 capitalize text-md"
      >
        {name}
      </Button>
    </form>
  );
};

export default FormClient;
