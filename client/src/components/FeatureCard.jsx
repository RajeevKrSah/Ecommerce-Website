import React from "react";
import { GiCutDiamond } from "react-icons/gi";
import { FaLeaf, FaHandshake } from "react-icons/fa";
import { AiOutlineHourglass } from "react-icons/ai";

const iconsMap = {
  GiCutDiamond: <GiCutDiamond />,
  FaLeaf: <FaLeaf />,
  FaHandshake: <FaHandshake />,
  AiOutlineHourglass: <AiOutlineHourglass />,
};

const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <div className="flex flex-col items-center text-center border-b-2 sm:border-none border-gray-200 p-3 sm:p-0">
      <div className={`${color} text-4xl mb-2`}>{iconsMap[icon]}</div>
      <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
