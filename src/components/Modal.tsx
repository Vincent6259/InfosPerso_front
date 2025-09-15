interface ModalComp {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal = ({ children, isOpen }: ModalComp) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-500/50 justify-center items-center ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className="bg-white p-10 rounded-sm relative">{children}</div>
      </div>
    </>
  );
};

export default Modal;
