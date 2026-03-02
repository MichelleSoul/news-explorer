import Button from "../Button/Button";
import Modal from "./Modal";

export default function ModalWithForm({
  isOpen,
  onClose,
  title,
  children,
  onSubmit = (e) => {
    e.preventDefault();
  },
  submitLabel = "Submit",
  disabled = false,
  footer,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(e);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h1 className="mb-4.5 font-roboto text-2xl font-black text-black">{title}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {children}

        <Button type="submit" className="mb-4" disabled={disabled}>
          {submitLabel}
        </Button>

        {footer && <div className="text-center font-inter text-sm text-black">{footer}</div>}
      </form>
    </Modal>
  );
}
