import { useCallback, useEffect, useRef, useState } from "react";

const SidebarScrollArea = ({ children, className = "" }) => {
  const scrollRef = useRef(null);
  const [thumb, setThumb] = useState({ height: 80, top: 8 });

  const updateThumb = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const canScroll = scrollHeight > clientHeight + 1;

    if (!canScroll) {
      setThumb({
        height: Math.max(clientHeight - 16, 80),
        top: 0,
      });
      return;
    }

    const ratio = clientHeight / scrollHeight;
    const height = Math.max(ratio * clientHeight, 48);
    const maxTop = clientHeight - height - 16;

    const top =
      maxTop <= 0
        ? 0
        : (scrollTop / (scrollHeight - clientHeight)) * maxTop;

    setThumb({ height, top });
  }, []);

  useEffect(() => {
    const run = () => requestAnimationFrame(updateThumb);
    run();

    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => updateThumb();

    const resizeObserver = new ResizeObserver(run);

    resizeObserver.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", run);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", run);
      resizeObserver.disconnect();
    };
  }, [updateThumb, children]);

  return (
    <div className={`relative min-h-0 ${className}`}>
      <div
        ref={scrollRef}
        className="sidebar-scroll-hide h-full overflow-y-auto overflow-x-hidden"
      >
        {children}
      </div>

      <div
        className="pointer-events-none absolute top-0 bottom-0 right-0 w-2"
        aria-hidden="true"
      >
        <div
          className="absolute right-0 w-2 rounded-full bg-[#424242]"
          style={{
            height: `${thumb.height}px`,
            top: `${thumb.top}px`,
          }}
        />
      </div>
    </div>
  );
};

export default SidebarScrollArea;