import React, { FC } from "react";
import { UnsplashUser } from "../../../../../types";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Alert } from "@/components/bootstrap";

const getUser = async () => {};

interface Props {
  params: {
    // whatever you put in the dynamic name of the folder
    username: string;
  };
}

// async because we want to put the full name of the user into the page title, but we only get these values from the response of the API as we have to wait for them. Whereas in the topics page, we just use the params value to generate metadata which we get immediately because this is part of the URL. So we need to export an async function to generateMetadata.

export const generateMetadata = async ({ params: { username } }: Props): Promise<Metadata> => {
  // the fetch requests are deduped but better export this into a module
  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (!response.ok) {
    return { title: "Inexistent User" };
  }

  const user: UnsplashUser = await response.json();

  return { title: user.username, description: `${user.first_name} ${user.last_name}` };
};

const UserPage: FC<Props> = async ({ params }) => {
  const username = params.username || "";

  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  const user: UnsplashUser = await response.json();

  if (!user.username) {
    return notFound();
  }

  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the <strong>page title</strong> dynamically from
        the API response.
      </Alert>
      <h1>{user.username}</h1>
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <a href={`https://unsplash.com/${user.username}`}>Unsplash profile</a>
    </div>
  );
};

export default UserPage;
