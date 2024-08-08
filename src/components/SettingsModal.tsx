import React from "react";

const SettingsModal = () => {
  // Styles for the modal (basic inline styling for simplicity)

  return (
    <div className="fixed flex top-20 left-20 right-20 bottom-20 bg-green-400 p-1 justify-center items-center">
      <h2>Settings</h2>
      <p>Settings content goes here.</p>
      <button>Close</button>
    </div>
  );
};

export default SettingsModal;
