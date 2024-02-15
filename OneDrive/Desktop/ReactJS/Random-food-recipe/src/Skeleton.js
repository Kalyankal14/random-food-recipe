import React from "react";
import { Spinner } from "@material-tailwind/react";

const Skeleton = () => {
  return (
    <div className="flex items-center justify-center mt-24">
      <Spinner className="w-16 h-16 text-gray-900/50" />
    </div>
  );
};

export default Skeleton;
