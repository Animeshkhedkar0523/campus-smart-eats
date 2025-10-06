import Navbar from "@/components/Navbar";
import Home from "./Home";

const Index = () => {
  return (
    <>
      <Navbar cartCount={0} />
      <Home />
    </>
  );
};

export default Index;
