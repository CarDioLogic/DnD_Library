import React from "react";

const ExtraPageContent = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 max-h-[80vh] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl max-h-[80vh] grain-wrap rounded-sm">
        <div className="grain-noise"></div>
        <div className="page-overlay"></div>

        <div
          className={`relative z-10 max-h-[80vh] overflow-auto border border-gray-500 shadow-inner p-6 rounded-sm text-book-ink font-uncial ${className}`}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 border border-gray-400 rounded-sm px-2 py-1 text-sm bg-white/80"
          >
            X
          </button>

          <div className="pr-10"
           dangerouslySetInnerHTML={{ __html: children }}></div>
        </div>
      </div>
    </div>
  );
};

export default ExtraPageContent;