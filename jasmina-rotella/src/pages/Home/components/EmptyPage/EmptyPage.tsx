import React from "react";

interface EmptyPageProps {
  titleheader?: React.ReactNode;
  descriptionheader?: React.ReactNode;
  titlenav?: React.ReactNode;
  descriptionnav?: React.ReactNode;
  titlemain?: React.ReactNode;
  descriptionmain?: React.ReactNode;
  titlefooter?: React.ReactNode;
  descriptionfooter?: React.ReactNode;
}

const EmptyPage: React.FC<EmptyPageProps> = ({
  titleheader,
  descriptionheader,
  titlenav,
  descriptionnav,
  titlemain,
  descriptionmain,
  titlefooter,
  descriptionfooter
}) => {
  return (
    <div className="container-grid">
      <div className="page-header">
        {titleheader}
        {descriptionheader}
      </div>
      <div className="page-nav">
        {titlenav}
        {descriptionnav}
      </div>
      <div className="page-main">
        {titlemain}
        {descriptionmain}
      </div>
      <div className="page-footer">
        {titlefooter}
        {descriptionfooter}
      </div>
    </div>
  );
};

export default EmptyPage;
