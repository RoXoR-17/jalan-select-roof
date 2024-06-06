function ExportButton({ exporting = false, exportHandler = () => {} }) {
  return (
    <button className="export-btn" onClick={exportHandler} disabled={exporting}>
      Export{exporting ? "ing" : ""}
    </button>
  );
}

export default ExportButton;
