import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex flex-col w-full items-center mt-20 mb-14">
        <div className="flex flex-col w-1/2 items-center">
          <h1 className="text-5xl text-center font-semibold text-gray-800">Do you need help with Household issues?</h1>
          <p className="pt-6 pb-12">Find people in your area willing to help!</p>
          <div>
            <Link to="/login">
              <button className="btn-lg btn btn-neutral bg-amber-400 text-amber-800 font-bold px-6 py-2 rounded-full mx-2">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn-lg btn btn-neutral bg-amber-400 text-amber-800 font-bold px-6 py-2 rounded-full mx-2">SignUp</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-amber-200 pb-6 mb-10">
        <h2 className="text-center text-2xl font-bold text-gray-800 py-8">Your benefits with HomeAid</h2>
        <div className="flex flex-row justify-around">
          <div className="flex flex-col w-80">
            <img src="/img/1.jpg" className="w-32 h-32 rounded-tl-2xl rounded-br-2xl" />
            <h3 className="text-lg font-bold text-gray-800 py-3">Get help</h3>
            <p>Compare offers and accept the offer that suits you and your home best, in just a few clicks.</p>
          </div>
          <div className="flex flex-col w-80">
            <img src="/img/2.jpg" className="w-32 h-32 rounded-tl-2xl rounded-br-2xl" />
            <h3 className="text-lg font-bold text-gray-800 py-3">Offer help</h3>
            <p>Check requests from people in your area, and offer help as per your skills and availability.</p>
          </div>
        </div>
      </div>
      <div className="bg-amber-100 mb-10">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2 p-12 pr-40">
            <h2 className="text-2xl font-bold text-gray-800 py-8">How to get Help</h2>
            <p className="text-lg font-bold text-gray-800 py-3">It's quite simple !!!</p>
            <p>Just login and create your request so that others near you can view it and offer assistance.</p>
          </div>
          <div className="flex flex-col w-1/2">
            <img src="/img/2.jpg" className="" />
          </div>
        </div>
      </div>
      <div className="bg-amber-100 mb-10">
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <img src="/img/2.jpg" className="" />
          </div>
          <div className="flex flex-col w-1/2 p-12 pr-40">
            <h2 className="text-2xl font-bold text-gray-800 py-8">How to offer Help</h2>
            <p className="text-lg font-bold text-gray-800 py-3">So kind of you :)</p>
            <p>Login and view requests for help from others near you and offer assistance.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
