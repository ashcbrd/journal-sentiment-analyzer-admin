"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register, login } from "../services/auth-service";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUser } from "@/context/user-context";

interface FormClientProps {
  name: string;
}

interface FormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const FormClient: React.FC<FormClientProps> = ({ name }) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("api base url:  ", process.env.BASE_API_URL);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (name === "login") {
        try {
          const loginResponse = await login(formData.email, formData.password);
          console.log("Login Success:", loginResponse);
          setUser(loginResponse);
          router.push("/students");
        } catch (error) {}
      } else if (name === "register") {
        try {
          const registerResponse = await register(formData);
          console.log("Register Success:", registerResponse);
          router.push("/auth");
        } catch (error) {}
      }
    } catch (error) {
      console.error("Error:", error || "Unknown Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full rounded-lg">
      <div className="flex flex-col gap-4">
        {name === "login" ? (
          <>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
          </>
        ) : (
          <>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-2 px-3"
            />
          </>
        )}
        <Button type="submit" className="w-full mt-6 capitalize text-md">
          {name}
        </Button>
      </div>
    </form>
  );
};

export default FormClient;
