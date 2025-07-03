import "./NotesModal.css";

export default function NotesModal({ htmlContent, onClose }) {
  return (
    <div className="notes-modal-backdrop">
      <div className="notes-modal">
        <div className="notes-modal-header">
          <h3>Full Notes</h3>
          <button onClick={onClose} className="notes-modal-close">✕</button>
        </div>
        <div
          className="notes-modal-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
