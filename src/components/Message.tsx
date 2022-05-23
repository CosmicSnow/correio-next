import React from "react";

interface MessageProps {
  content: string;
  bgColor: string;
}

const Message: React.FC<MessageProps> = ({ content, bgColor }) => {
  return (
    <>
      <div
        className={`
        w-24
        h-24
        sm:w-32
        sm:h-32
        md:w-48
        md:h-48
        ${bgColor || "bg-blue-200"}
        transform
        hover:scale-105
        transition
        py-2
        px-4
        shadow
        text-xs
        md:text-base
        cursor-pointer
      `}
      >
        <div className="max-w-full max-h-full overflow-ellipsis overflow-hidden">
          {content}
        </div>
      </div>
    </>
  );
};

export { Message };
