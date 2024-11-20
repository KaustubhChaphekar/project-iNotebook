import React from "react";
import Loading from "/assets/spinner.gif";

const Spinner = () => {
  return (
    <div >
      <img
        className="w-6 h-6 text-white" // Adjust size of the spinner here
        src={Loading}
        alt="Loading"
      />
    </div>
  );
};

export default Spinner;
