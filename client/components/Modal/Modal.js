
const Modal = ({ children, id }) => {
    return (
        <div>
            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal">
                {children}
            </div>
        </div>
    )
}
export default Modal;