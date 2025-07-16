import React from 'react';

const StripeHeading = ({
  text,
  fontSize = "text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px]"
}) => {
  return (
    <div className="text-center mb-10 bg-[#fff2e7] py-3 rounded-lg border-2 border-[#b601fe]">
      <h1 className={`text-[#800000] font-bold ${fontSize}`}>
        {text}
      </h1>
    </div>
  );
};

export default StripeHeading;
