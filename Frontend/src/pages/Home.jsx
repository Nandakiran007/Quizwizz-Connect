import Navbar from "../components/Navbar";
import Buttonset from "../components/Buttonset";
import "./css/Home.css";
function Home() {
  return (
    <>
      <Navbar />
      <div className="bgHome">
        <Buttonset />
      </div>
    </>
  );
}

export default Home;
