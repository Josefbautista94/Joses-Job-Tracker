import "./ConfirmModal.css";

export default function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal">
        <p>Are you sure you want to delete this application?</p>
        <div className="confirm-buttons">
          <button onClick={onConfirm} className="confirm-yes">Yes</button>
          <button onClick={onCancel} className="confirm-no">Cancel</button>
        </div>
      </div>
    </div>
  );
}