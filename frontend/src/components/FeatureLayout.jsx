import React from "react";

const FeatureLayout = ({ title, subtitle, children }) => {
  return (
    <div className="feature-page">
      <div className="panel panel-wide">
        <div className="panel-header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FeatureLayout;
