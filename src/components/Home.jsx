import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="./img/HouseAid-Logo1.jpg"
            className="max-w-sm rounded-lg shadow-2xl pl-2"
          />
          <div>
            <h1 className="text-5xl font-bold">HouseAid App Homepage</h1>
            <p className="py-6">
              Get the help you require whenever you require!
            </p>
            <Link to="/login">
              <button className="btn-lg btn btn-neutral">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn-lg btn btn-neutral">SignUp</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
