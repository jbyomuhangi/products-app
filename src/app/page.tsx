import { redirect } from "next/navigation";

const Home = () => {
  redirect("/products?page=0&rowsPerPage=100");

  return null;
};

export default Home;
