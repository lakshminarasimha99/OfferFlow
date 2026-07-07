function DeleteModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3 style={{ marginTop: 0 }}>Delete application?</h3>
        <p>Are you sure you want to delete {itemName}? This action cannot be undone.</p>
        <div className="actions">
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
