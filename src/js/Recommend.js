import React from "react";
import "../css/Recommend.css";

const Recommend = ({ responseData }) => {
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
    <div className="rec">
      <h2 className="infor-main-title">인스턴스 추천 리스트</h2>
      <div>
        <p className="infor-sub-title">
          <b>State : </b> running
        </p>
      </div>
      <div className="Recommend-container">
        <div className="Recommend-sub-container">
          <div className="Recommend-section">
            {/*<p className="Rec-sub-title1">
              <span className="Rec-sub-title2">EC2</span>Instances
  </p>*/}
            {responseData &&
              responseData.ec2_metrics &&
              filterRunningEC2Instances(responseData.ec2_metrics).map(
                (instance, idx) => (
                  <div key={idx} className="Recommend-instance-group">
                    <div className="Recommend-instance">
                      <div className="rec-main-box">
                        <p className="id-title">
                          <span className="Rec-sub-title4">[EC2]</span> Instance
                          ID : {instance.instance_id}
                        </p>
                        <p>Instance Type : {instance.instance_type}</p>
                        <p>Instance Name : {instance.instance_name}</p>{" "}
                        {/* 수정된 부분 */}
                        <p>State : {instance.state}</p>
                      </div>
                      <p className="rec-title">Recommendations</p>
                      {instance.reco && instance.reco.length > 0 ? (
                        instance.reco.map((recommendation, rIdx) => (
                          <div key={rIdx} className="rec-sub-box">
                            <p className="id-title">
                              Recommended Instance Type:{" "}
                              {recommendation.instance_type}
                            </p>
                            <p>OS Engine : {recommendation.ec2_os_engine}</p>
                            <p>Price : ${recommendation.price.toFixed(4)}</p>
                            <p>expected_max : {recommendation.expected_max}</p>
                          </div>
                        ))
                      ) : (
                        <p className="rec-sub-box">
                          No recommendations available
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
        <div className="Recommend-sub-container">
          <div className="Recommend-section">
            {/*<p className="Rec-sub-title1">
              <span className="Rec-sub-title3">RDS</span> Instances
            </p>*/}
            {responseData &&
              responseData.rds_metrics &&
              filterAvailableRDSInstances(responseData.rds_metrics).map(
                (instance, idx) => (
                  <div key={idx} className="Recommend-instance-group">
                    <div className="Recommend-instance">
                      <div className="rec-main-box">
                        <p className="id-title">
                          <span className="Rec-sub-title4">[RDS]</span> DB
                          Instance Identifier :{" "}
                          {instance.db_instance_identifier}
                        </p>
                        <p>DB Instance Class : {instance.db_instance_class}</p>
                        <p>Engine : {instance.engine}</p>
                        <p>Status : {instance.db_instance_status}</p>
                      </div>
                      {/* <p>Metrics:</p>
                <ul>
                  <li>CPU Utilization:</li>
                  <ul>
                    <li>Minimum : {instance.metrics.CPUUtilization.Minimum}</li>
                    <li>Maximum : {instance.metrics.CPUUtilization.Maximum}</li>
                    <li>Average : {instance.metrics.CPUUtilization.Average}</li>
                  </ul>
                  <li>Database Connections:</li>
                  <ul>
                    <li>Minimum : {instance.metrics.DatabaseConnections.Minimum}</li>
                    <li>Maximum : {instance.metrics.DatabaseConnections.Maximum}</li>
                    <li>Average : {instance.metrics.DatabaseConnections.Average}</li>
                  </ul>
                  <li>Free Storage Space:</li>
                  <ul>
                    <li>Minimum : {instance.metrics.FreeStorageSpace.Minimum}</li>
                    <li>Maximum : {instance.metrics.FreeStorageSpace.Maximum}</li>
                    <li>Average : {instance.metrics.FreeStorageSpace.Average}</li>
                  </ul>
                </ul> */}
                      <p className="rec-title">Recommendations</p>
                      {instance.reco && instance.reco.length > 0 ? (
                        instance.reco.map((recommendation, rIdx) => (
                          <div key={rIdx} className="rec-box">
                            <p>
                              Recommended Instance Type :{" "}
                              {recommendation.instance_type}
                            </p>
                            <p>OS Engine : {recommendation.ec2_os_engine}</p>
                            <p>Price : ${recommendation.price.toFixed(4)}</p>
                            <p>expected_max : {recommendation.expected_max}</p>
                          </div>
                        ))
                      ) : (
                        <p className="rec-sub-box">
                          No recommendations available
                        </p>
                      )}
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

export default Recommend;
