
const Modal = ({ children, id }) => {
    return (
        <div className="modal modal-open cursor-default" id={id} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    )
}
export default Modal;