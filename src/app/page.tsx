import { redirect } from "next/navigation";

const Home = () => {
  redirect("/products");

  return null;
};

export default Home;
