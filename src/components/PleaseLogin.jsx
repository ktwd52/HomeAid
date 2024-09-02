const PleaseLogin = () => {
  return (
    <>
      <p className="text-center justify-between text-[40px] bg-[#ff5010]">
        <div>
          Your authentication token probably expired
          <p>
            please LogOUT and then logIN again with your email and password to
            see the requested table data
          </p>
        </div>
      </p>
    </>
  );
};
export default PleaseLogin;
