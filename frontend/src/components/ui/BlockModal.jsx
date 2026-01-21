import { KeyIcon, KeyRound, Trash2, TriangleAlert } from "lucide-react";
import React from "react";

const BlockModal = ({ titels, setOpenModal, setDeleteId, schoolId }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white w-44 p-2 shadow-md rounded-[12px] space-y-2 ">
      {titels.map((title) => (
        <button
          className="w-full flex flex-row items-center justify-start space-x-2 border border-gray-100 p-2 rounded-[10px] hover:bg-gray-100"
          onClick={() => {
            if (title.name === "delete") {
              setDeleteId(schoolId);
              setOpenModal(true);
            }
          }}
        >
          <span
            className={`p-2 rounded-md border border-gray-100 text-orange-400 ${title.name === "delete" ? "text-red-400" : title.name === "hide" ? "text-textc1-700" : title.name === "restricted" ? "text-yellow-500" : "text-black"}`}
          >
            <title.icon size={12} />
          </span>
          <span className="text-[17px]">{title.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BlockModal;
