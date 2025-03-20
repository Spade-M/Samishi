import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function PopupModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    let existingRoot = document.getElementById("modal-root");

    // If modal root doesn't exist, create it dynamically in <body>
    if (!existingRoot) {
      existingRoot = document.createElement("div");
      existingRoot.id = "modal-root";
      document.body.appendChild(existingRoot);
    }

    setModalRoot(existingRoot);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
        <button
          onClick={() => setIsOpen(true)}
        >
          Create Post
        </button>
      </div>

      {isOpen && modalRoot
        ? createPortal(
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
              style={{ position: "fixed", top: "50%", left: "50%",transform: "translate(-50%, -50%)", maxwidth: "400px", height: "auto",
                margin: "0 auto",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                background: "rgb(246, 212, 247)", }}
            >
              <div
                className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full relative"
                style={{ transform: "scale(1)", transition: "opacity 0.3s ease-out" }}
              >
                
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Create Post
            </h2>
                <p className="text-gray-600 mt-2">This is a simple popup modal.</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>,
            modalRoot
          )
        : null}
    </>
  );
}
