import Trash from "../assets/trash.png";

const ClassDeleteModal = ({ setDeleteModal, handleDelete, id }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <img src={Trash} alt="" />
      <p className="text-center text-xl font-sans">
        Are you sure you want to delete this item?
      </p>
      <div className="w-full flex flex-row items-center justify-evenly space-x-2 ">
        <button
          onClick={() => {
            setDeleteModal(false);
          }}
          className="bg-primary-700 border border-primary-700 py-2 w-full rounded-md text-white"
        >
          No
        </button>
        <button
          onClick={() => {
            handleDelete(id);
          }}
          className="bg-white text-primary-700 border border-primary-700 py-2 w-full rounded-md"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default ClassDeleteModal;
