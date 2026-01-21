import { Link } from "react-router-dom";
import Homeworkicon from "../assets/homeworkicon.png";
import { ChevronRight } from "lucide-react";
const HomeWorkSubjectCard = ({ image, subject, teacher, date, _id }) => {
  function formatDateToDDMMMYY(date) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    };

    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      date,
    );
    return formattedDate.replace(/\//g, "-");
  }

  return (
    <Link
      to={`${_id}`}
      className="bg-white flex flex-row  items-center lg:items-start p-2 lg:flex-col lg:space-y-2  lg:p-4 border border-gray-100 rounded-lg lg:rounded-xl space-x-2 relative"
    >
      <div className="p-2 lg:p-0 border border-gray-100 rounded-lg lg:border-none">
        <img className="hidden lg:block w-full rounded-xl" src={image} alt="" />
        <img
          className="rounded-md lg:hidden w-[51px] h-[51px] "
          src={Homeworkicon}
          alt=""
        />
      </div>
      <div className="flex flex-col lg:space-y-1">
        <h2 className="text-[14px] lg:text-[28px] font-kalpurush">{subject}</h2>
        <span className="text-[12px] lg:text-[17px] text-gray-700 uppercase">
          {teacher}
        </span>
        <p className="text-[12px] lg:text-[14px] text-gray-500">
          {formatDateToDDMMMYY(date)}
        </p>
      </div>
      <div className="absolute right-4 top-[40%] text-textc3-700 lg:hidden">
        <ChevronRight />
      </div>
    </Link>
  );
};

export default HomeWorkSubjectCard;
