import "../../styles/footprints.css";

const Footprints = () => {
  return (
    <div className="footprints-container">
      <div className="footprints-right">
        <div className="footprints-toes">
          <span className="toe big"></span>
          <span className="toe second"></span>
          <span className="toe middle"></span>
          <span className="toe fourth"></span>
          <span className="toe little"></span>
        </div>
        <div className="footprints-insole-right">
          <span className="footprints-insole-right-row-span"></span>
        </div>
      </div>

      <div className="footprints-left">
        <div className="footprints-toes-left">
          <span className="toe big"></span>
          <span className="toe second"></span>
          <span className="toe middle"></span>
          <span className="toe fourth"></span>
          <span className="toe little"></span>
        </div>
        <div className="footprints-insole-left">
          <span className="footprints-insole-left-row-span"></span>
        </div>
      </div>
    </div>
  );
};

export default Footprints;
