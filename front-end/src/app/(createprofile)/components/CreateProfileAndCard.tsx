import { CreateCard } from "./CreateCard";

import { CreateProfile } from "./CreateProfile";

export const CreateProfileAndCard = () => {
  const stepPages = [<CreateProfile />, <CreateCard />][1];
  return <div>{stepPages}</div>;
};
