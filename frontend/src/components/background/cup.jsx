import "../../styles/cup.css";

const Cup = () => {
  return (
    <div className="cup-container">
      <div className="cup">
        <div className="bottom"></div>
        <div className="cup-center">
          <div className="cup-center-content">
            <div className="cup-center-row">
              <div className="zero">0</div>
              <div className="one">1</div>
              <div className="zero">0</div>
              <div className="one">1</div>
            </div>
            <div className="cup-center-row">
              <div className="zero">0</div>
              <div className="one">1</div>
              <div className="zero">0</div>
              <div className="one">1</div>
            </div>
          </div>
        </div>
        <div className="top">
          <div className="circle">
            <div className="tea"></div>
          </div>
          <div className="vapour">
            <span style={{ "--i": 11 }}></span>
            <span style={{ "--i": 2 }}></span>
            <span style={{ "--i": 12 }}></span>
            <span style={{ "--i": 4 }}></span>
            <span style={{ "--i": 17 }}></span>
            <span style={{ "--i": 9 }}></span>
            <span style={{ "--i": 20 }}></span>
            <span style={{ "--i": 6 }}></span>
            <span style={{ "--i": 13 }}></span>
            <span style={{ "--i": 10 }}></span>
            <span style={{ "--i": 14 }}></span>
            <span style={{ "--i": 7 }}></span>
            <span style={{ "--i": 1 }}></span>
            <span style={{ "--i": 18 }}></span>
            <span style={{ "--i": 8 }}></span>
            <span style={{ "--i": 16 }}></span>
            <span style={{ "--i": 3 }}></span>
            <span style={{ "--i": 15 }}></span>
            <span style={{ "--i": 19 }}></span>
            <span style={{ "--i": 5 }}></span>
          </div>
        </div>
        <div className="handle"></div>
      </div>
    </div>
  );
};

export default Cup;
