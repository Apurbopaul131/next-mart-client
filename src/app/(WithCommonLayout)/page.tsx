"use client";

import { useUser } from "@/context/UserContext";

const Home = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <h1>This is home page</h1>
    </div>
  );
};

export default Home;
