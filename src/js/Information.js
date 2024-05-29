import React from "react";
import "../css/Information.css";

const Information = ({ responseData }) => {
  // EC2 인스턴스를 필터링하는 함수
  const filterRunningEC2Instances = (ec2Instances) => {
    return ec2Instances.filter((instance) => instance.state === "running");
  };

  // RDS 인스턴스를 필터링하는 함수
  const filterAvailableRDSInstances = (rdsInstances) => {
    return rdsInstances.filter(
      (instance) => instance.db_instance_status === "available"
    );
  };

  return (
    <div className="infor">
      <h2>CPU 사용량</h2>
      <div>
        <p className="infor-sub-title">
          <b>State : </b> running
        </p>
      </div>
      <div className="infor-container">
        <div className="infor-sub-container">
          <div className="infor-section">
            {responseData &&
              responseData.ec2_metrics &&
              filterRunningEC2Instances(responseData.ec2_metrics).map(
                (instance, idx) => (
                  <div key={idx} className="infor-instance-group">
                    <div className="infor-instance">
                      <div className="rec-box">
                        <p className="id-title">
                          EC2 Instance ID : {instance.instance_id}
                        </p>
                        <p>Instance Type : {instance.instance_type}</p>
                        <p>Instance Name : {instance.instance_name}</p>
                        <p>State : {instance.state}</p>
                        <p>Metrics:</p>
                        <ul>
                          <li>CPU Utilization:</li>
                          <ul>
                            <li>Minimum : {instance.metrics.Minimum}</li>
                            <li>Maximum : {instance.metrics.Maximum}</li>
                            <li>Average : {instance.metrics.Average}</li>
                          </ul>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
        <div className="infor-sub-container">
          <div className="infor-section">
            {responseData &&
              responseData.rds_metrics &&
              filterAvailableRDSInstances(responseData.rds_metrics).map(
                (instance, idx) => (
                  <div key={idx} className="infor-instance-group">
                    <div className="infor-instance">
                      <div className="rec-box">
                        <p className="id-title">
                          DB Instance Identifier :{" "}
                          {instance.db_instance_identifier}
                        </p>
                        <p>DB Instance Class : {instance.db_instance_class}</p>
                        <p>Engine : {instance.engine}</p>
                        <p>Status : {instance.db_instance_status}</p>
                        <p>Metrics:</p>
                        <ul>
                          <li>CPU Utilization:</li>
                          <ul>
                            <li>
                              Minimum :{" "}
                              {instance.metrics.CPUUtilization.Minimum}
                            </li>
                            <li>
                              Maximum :{" "}
                              {instance.metrics.CPUUtilization.Maximum}
                            </li>
                            <li>
                              Average :{" "}
                              {instance.metrics.CPUUtilization.Average}
                            </li>
                          </ul>
                          <li>Database Connections:</li>
                          <ul>
                            <li>
                              Minimum :{" "}
                              {instance.metrics.DatabaseConnections.Minimum}
                            </li>
                            <li>
                              Maximum :{" "}
                              {instance.metrics.DatabaseConnections.Maximum}
                            </li>
                            <li>
                              Average :{" "}
                              {instance.metrics.DatabaseConnections.Average}
                            </li>
                          </ul>
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
