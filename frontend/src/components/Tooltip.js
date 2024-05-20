import React, { useState } from 'react';

const Tooltip = ({ message, children, position = "above" }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  const positionClasses = position === "above" 
    ? "bottom-full mb-2" // Margin bottom for space between tooltip and icon
    : "top-full mt-2";  // Margin top for space between tooltip and icon

  return (
    <div className="relative flex items-center"
         onMouseEnter={() => setIsHovering(true)}
         onMouseLeave={() => setIsHovering(false)}>
      {children}
      {isHovering && (
        <div className={`absolute w-auto p-2 min-w-max left-1/2 transform -translate-x-1/2 ${positionClasses} bg-black text-white text-xs rounded-md shadow-lg`}
             style={{ zIndex: 50 }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
