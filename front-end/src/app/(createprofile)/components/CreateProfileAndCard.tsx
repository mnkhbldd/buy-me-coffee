"use client";
import { useState } from "react";
import { CreateCard } from "./CreateCard";

import { CreateProfile } from "./CreateProfile";

export const CreateProfileAndCard = () => {
  const [pageCount, setPageCount] = useState(1);

  const handleNextPage = () => {
    if (pageCount < 2) {
      setPageCount(pageCount + 1);
    }
  };
  const stepPages = [
    <CreateProfile handleNextPage={handleNextPage} />,
    <CreateCard />,
  ][pageCount];

  return <div>{stepPages}</div>;
};
