import React from "react";

const Tag = ({ text }) => {
  return (
    <div className="tag bg-white rounded-lg transform hover:scale-110">
      {text}
    </div>
  );
};

export default Tag;
