export function CommunityMark({ small = false }) {
  return (
    <div className={small ? 'brand-mark brand-mark--small' : 'brand-mark'} aria-hidden="true">
      <span className="brand-mark__ring" />
      <span className="brand-mark__core">6</span>
      <span className="brand-mark__flag brand-mark__flag--red" />
      <span className="brand-mark__flag brand-mark__flag--blue" />
      <span className="brand-mark__star">★</span>
    </div>
  );
}
import React from "react";
