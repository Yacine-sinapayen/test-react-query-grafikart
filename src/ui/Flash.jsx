export function Message({ children, onClose }) {
  return (
    <div className="ui positive message">
      <i className="close icon" onClick={onClose} />
      <p style={{ marginTop: 0 }}>{children}</p>
    </div>
  );
}
