import { getCurrentUser } from "@/services/AuthServices";

const Home = async () => {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div>
      <h1>This is home page</h1>
    </div>
  );
};

export default Home;
