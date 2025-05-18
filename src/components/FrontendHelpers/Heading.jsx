import React from 'react';

const StripeHeading = ({ text, fontSize = "text-3xl" }) => {
  return (
    <div className="text-center mb-10 bg-[#fff2e7] py-3 rounded-lg border-2 border-[#ffedc5e7]">
      <h1 className={`text-[#51087E] font-bold ${fontSize}`}>
        {text}
      </h1>
    </div>
  );
};

export default StripeHeading;
