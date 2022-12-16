import { FaAngleUp, FaAngleDown } from "react-icons/fa";

function CommentVoting() {
  return (
    <div className="flex flex-col items-center px-4 border-r-solid border-r-primary border-r-2">
      <button className="button">
        <FaAngleUp className="text-4xl hover:text-primary hover:cursor-pointer" />
      </button>
      <p className="text-2xl font-bold">0</p>
      <button>
        <FaAngleDown className="text-4xl hover:text-primary hover:cursor-pointer" />
      </button>
    </div>
  );
}

export default CommentVoting;
