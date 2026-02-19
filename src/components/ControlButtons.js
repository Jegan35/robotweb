import React from 'react';

const ControlButtons = () => {
  return (
    <div className="control-buttons-container">
      {/* Row 1 */}
      <div className="btn-row">
        <button className="btn btn-dark toggle-btn">OFF</button>
        <button className="btn btn-blue">🏠</button>
        <button className="btn btn-green">▶ Connect</button>
        <button className="btn btn-orange">⏻ START</button>
        <button className="btn btn-outline-green">M: SIM</button>
      </div>

      {/* Row 2 */}
      <div className="btn-row">
        <button className="btn btn-purple">📁 FILES</button>
        <div className="info-box dark-box">Opened PR: mh_l1</div>
        <div className="info-box dark-box">TR: None</div>
        <div className="info-box dark-box">Opened: ppp</div>
        <button className="btn btn-pink">+ TOOLS</button>
        <div className="info-box empty-box">Tool Name...</div>
      </div>

      {/* Row 3 */}
      <div className="btn-row">
        <button className="btn btn-green-full">✔️ SYSTEM OK</button>
        <button className="btn btn-red">🗑 Error Clear</button>
        <button className="btn btn-yellow">✖ Mark Clear</button>
        <button className="btn btn-purple-dark">⟳ RESET</button>
        <div className="info-box text-green">Speed: 0.0 %</div>
      </div>
    </div>
  );
};

export default ControlButtons;