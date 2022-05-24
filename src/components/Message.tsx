import React from "react";

import { useModal } from "hooks/useModal";

interface MessageProps {
  index: number;
  content: string;
  bgColor: string;
}

const Message: React.FC<MessageProps> = ({ index, content, bgColor }) => {
  const { toggle, setIndex } = useModal();

  const handleClick = () => {
    setIndex(index);
    toggle();
  };

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
        onClick={handleClick}
      >
        <div className="max-w-full max-h-full overflow-ellipsis overflow-hidden">
          {content}
        </div>
      </div>
    </>
  );
};

export { Message };
