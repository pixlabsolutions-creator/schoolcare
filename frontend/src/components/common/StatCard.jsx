import { ArrowRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  footer,
  children,
  order,
  status,
}) => {
  return (
    <div
      className={`flex flex-col  justify-between bg-white rounded-[12px] p-4  border border-gray-100 space-y-2  ${order} `}
    >
      <div className="flex flex-row justify-between items-center">
        <p className="text-[14px] lg:text-[17px] text-gray-500">{title}</p>

        {Icon ? (
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-100 flex items-center justify-center">
            <Icon size={16} className="text-purple-600" />
          </div>
        ) : (
          status && (
            <div
              className={`flex flex-row   text-[14px] lg:text-[17px] ${status === "Good" ? " text-green-600" : status === "Bad" ? " text-red-600" : "bg-gray-100 lg:bg-white text-gray-600 lg:text-primary-700 lg:font-semibold"}`}
            >
              <span className="flex mr-1 items-center justify-end text-purple-500 tracking-widest md:hidden">
                ···········
                <ArrowRight className="inline w-3 h-3" />
              </span>
              {status}
            </div>
          )
        )}
      </div>

      <h3 className="text-[24px] sm:text-2xl font-semibold text-gray-800">
        {value}
      </h3>
      <div className="text-[17px]">{children}</div>

      {footer && (
        <p className="text-xs lg:text-[17px] text-green-500">{footer}</p>
      )}
    </div>
  );
};

export default StatCard;
