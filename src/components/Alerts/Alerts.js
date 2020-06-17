import React from "react";
import { connect } from "react-redux";

const Alerts = ({ alerts }) => {
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div
        style={{
          position: "absolute",
          zIndex: "1",
          width: "92%",
          margin: "0 4%",
          textAlign: "center",
          fontSize: "16px",
          padding: "10px"
        }}
        key={alert.id}
        className={`alert alert-${alert.type}`}
      >
        <i className="fas fa-info-circle" />
        {alert.msg}
      </div>
    ))
  );
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
