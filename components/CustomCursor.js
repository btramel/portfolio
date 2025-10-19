import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [showHitMarker, setShowHitMarker] = useState(false);

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  useEffect(() => {
    // Mouse move handler
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      positionRef.current.mouseX = clientX;
      positionRef.current.mouseY = clientY;

      // Instant follow for dot
      if (cursorDot.current) {
        cursorDot.current.style.transform = `translate3d(${
          clientX - cursorDot.current.clientWidth / 2
        }px, ${clientY - cursorDot.current.clientHeight / 2}px, 0)`;
      }
    };

    // Check for hoverable elements
    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (
        e.target.tagName === "A" ||
        e.target.tagName === "BUTTON" ||
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      setClickPosition({ x: e.clientX, y: e.clientY });
      setShowHitMarker(true);
      setTimeout(() => setShowHitMarker(false), 400);
    };
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Smooth follow for outline
  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);

      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;

      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;

        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }

      if (cursorOutline.current) {
        cursorOutline.current.style.transform = `translate3d(${
          destinationX - cursorOutline.current.clientWidth / 2
        }px, ${destinationY - cursorOutline.current.clientHeight / 2}px, 0)`;
      }
    };

    followMouse();

    return () => {
      if (positionRef.current.key !== -1) {
        cancelAnimationFrame(positionRef.current.key);
      }
    };
  }, []);

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorDot}
        className={`
        hidden sm:block
        fixed pointer-events-none z-[9999]
        rounded-full bg-white
        transition-all duration-200 ease-out
        ${isClicking ? "w-3 h-3" : "w-2 h-2"}
        ${isHovering ? "opacity-0 scale-0" : "opacity-100 scale-100"}
      `}
        style={{
          transform: "translate3d(0, 0, 0)",
        }}
      />

      {/* Outline cursor */}
      <div
        ref={cursorOutline}
        className={`
        hidden sm:block
        fixed pointer-events-none z-[9999]
        rounded-full border-2
        transition-all duration-300 ease-out
        overflow-hidden
        ${
          isClicking
            ? "w-10 h-10 border-[3px] border-[#05BFDB]"
            : "border-[#05BFDB]"
        }
        ${isHovering ? "w-16 h-16" : "w-12 h-12"}
      `}
        style={{
          transform: "translate3d(0, 0, 0)",
          ...(isHovering && {
            backdropFilter: "none",
            background: `radial-gradient(circle, rgba(5, 191, 219, 0.1) 0%, transparent 70%)`,
          }),
        }}
      >
        {isHovering && (
          <div
            className="absolute inset-0"
            style={{
              transform: "scale(1.5)",
              transformOrigin: "center",
              backdropFilter: "contrast(1.4) brightness(1.2)",
            }}
          />
        )}
      </div>

      {/* Hit marker - MOVED OUTSIDE */}
      {showHitMarker && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${clickPosition.x}px`,
            top: `${clickPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Cross lines */}
          <div className="relative w-3 h-3 animate-ping">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#05BFDB]/80" />
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#05BFDB]/80" />
          </div>
          {/* Corner brackets */}
          <div className="absolute inset-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 opacity-0 animate-[fadeOut_0.4s_ease-out]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#05BFDB]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#05BFDB]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#05BFDB]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#05BFDB]" />
          </div>
        </div>
      )}
    </>
  );
};

export default CustomCursor;
