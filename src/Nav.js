// React
import React from "react";
// Hooks
import useWindowWidth from "./hooks/useWindowWidth";

export default function Nav() {
  const { isTablet } = useWindowWidth();
  return (
    <div className="nav">
      {isTablet && <span>MenuIcon</span>}
      <span>MagnifyIcon</span>
      <div style={{ marginLeft: "auto" }}>
        <span>BellIcon</span>
      </div>
    </div>
  );
}
