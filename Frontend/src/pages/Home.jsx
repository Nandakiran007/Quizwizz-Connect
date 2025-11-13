import Navbar from "../components/Navbar";
import Buttonset from "../components/Buttonset";
import "./css/Home.css";
function Home() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
            }}
        >
            <Navbar />
            <Buttonset  />
            <div />
        </div>
    );
}

export default Home;
