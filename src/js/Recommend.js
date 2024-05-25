import React from "react";
import "../css/Recommend.css";

const Recommend = ({ responseData }) => {
  // EC2 인스턴스를 필터링하는 함수
  const filterRunningEC2Instances = (ec2Instances) => {
    return ec2Instances.filter(instance => instance.state === "running");
  };

  // RDS 인스턴스를 필터링하는 함수
  const filterAvailableRDSInstances = (rdsInstances) => {
    return rdsInstances.filter(instance => instance.db_instance_status === "available");
  };

  return (
    <div className="infor">
      <h2>실행중인 인스턴스 더 좋은걸로 추천</h2>
      <div className="Recommend-container">
        <div className="Recommend-con">
          <h3>EC2 Instances</h3>
          {responseData && responseData.ec2_metrics && filterRunningEC2Instances(responseData.ec2_metrics).map((instance, idx) => (
            <div key={idx} className="Recommend-instance-group">
              <div className="Recommend-instance">
                <p>Instance ID: {instance.instance_id}</p>
                <p>Instance Type: {instance.instance_type}</p>
                <p>State: {instance.state}</p>
                <p>Metrics:</p>
                <ul>
                  <li>Minimum: {instance.metrics.Minimum}</li>
                  <li>Maximum: {instance.metrics.Maximum}</li>
                  <li>Average: {instance.metrics.Average}</li>
                </ul>
                <p>Recommendations:</p>
                {instance.reco && instance.reco.length > 0 ? (
                  instance.reco.map((recommendation, rIdx) => (
                    <div key={rIdx}>
                      <p>Recommended Instance Type: {recommendation.instance_type}</p>
                      <p>OS Engine: {recommendation.ec2_os_engine}</p>
                      <p>Price: ${recommendation.price.toFixed(4)}</p>
                    </div>
                  ))
                ) : (
                  <p>No recommendations available</p>
                )}
              </div>
            </div>
          ))}

          <h3>RDS Instances</h3>
          {responseData && responseData.rds_metrics && filterAvailableRDSInstances(responseData.rds_metrics).map((instance, idx) => (
            <div key={idx} className="Recommend-instance-group">
              <div className="Recommend-instance">
                <p>DB Instance Identifier: {instance.db_instance_identifier}</p>
                <p>DB Instance Class: {instance.db_instance_class}</p>
                <p>Engine: {instance.engine}</p>
                <p>Status: {instance.db_instance_status}</p>
                <p>Metrics:</p>
                <ul>
                  <li>CPU Utilization:</li>
                  <ul>
                    <li>Minimum: {instance.metrics.CPUUtilization.Minimum}</li>
                    <li>Maximum: {instance.metrics.CPUUtilization.Maximum}</li>
                    <li>Average: {instance.metrics.CPUUtilization.Average}</li>
                  </ul>
                  <li>Database Connections:</li>
                  <ul>
                    <li>Minimum: {instance.metrics.DatabaseConnections.Minimum}</li>
                    <li>Maximum: {instance.metrics.DatabaseConnections.Maximum}</li>
                    <li>Average: {instance.metrics.DatabaseConnections.Average}</li>
                  </ul>
                  <li>Free Storage Space:</li>
                  <ul>
                    <li>Minimum: {instance.metrics.FreeStorageSpace.Minimum}</li>
                    <li>Maximum: {instance.metrics.FreeStorageSpace.Maximum}</li>
                    <li>Average: {instance.metrics.FreeStorageSpace.Average}</li>
                  </ul>
                </ul>
                <p>Recommendations:</p>
                {instance.reco && instance.reco.length > 0 ? (
                  instance.reco.map((recommendation, rIdx) => (
                    <div key={rIdx}>
                      <p>Recommended Instance Type: {recommendation.instance_type}</p>
                      <p>OS Engine: {recommendation.ec2_os_engine}</p>
                      <p>Price: ${recommendation.price.toFixed(4)}</p>
                    </div>
                  ))
                ) : (
                  <p>No recommendations available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommend;
