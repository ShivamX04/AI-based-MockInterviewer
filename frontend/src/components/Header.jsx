import { useState, useRef, useEffect } from "react";
import { Share, MoreHorizontal, Pin, Trash2 } from "lucide-react";
 
const Header = ({
  title = "AI Mock Interview",
  showMoreOptions = false,
  isPinned = false,
  onPin = () => {},
  onDelete = () => {},
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "AI Mock Interview",
          text: "Check this interview.",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-12 w-full items-center justify-between border-b border-white/10 bg-[#131522]/80 backdrop-blur-xl px-2">

      <button
        type="button"
        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-100 hover:bg-white/10 transition-colors"
      >
        <span>{title}</span>
        <i className="ri-arrow-down-s-line text-base text-zinc-400"></i>
      </button>

      <div className="flex mr-6 items-center gap-3">

         {/* Share Button */}
<button
  onClick={handleShare}
  title="Share"
  className="flex items-center gap-2 px-3 h-9 rounded-lg text-zinc-300 hover:bg-white/10 transition-colors"
>
  <Share size={18} strokeWidth={2} />
  <span className="text-sm font-medium">Share</span>
</button>

        {/* Three-dot Menu */}
        {showMoreOptions && (
          <div className="relative" ref={menuRef}>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="h-9 w-9 grid place-items-center rounded-lg text-zinc-300 hover:bg-white/10 transition-colors"
              title="More options"
            >
              <i className="ri-more-2-fill rotate-90 text-lg"></i>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-[#1B1D2B] shadow-2xl">

                {/* Pin */}
                <button
                  onClick={() => {
                    onPin();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-white/10 transition"
                >
                  <i className="ri-pushpin-line"></i>

                  {isPinned ? "Unpin Interview" : "Pin Interview"}
                </button>

                <div className="h-px bg-white/10"></div>

                {/* Delete */}
                <button
                  onClick={() => {
                    setMenuOpen(false);

                    if (
                      window.confirm(
                        "Delete this interview? This action cannot be undone."
                      )
                    ) {
                      onDelete();
                    }
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition"
                >
                  <i className="ri-delete-bin-6-line"></i>

                  Delete Interview
                </button>

              </div>
            )}

          </div>
        )}

      </div>

    </header>
  );
};

export default Header;