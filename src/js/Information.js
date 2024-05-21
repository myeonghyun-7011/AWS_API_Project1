import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "../css/Information.css"; // CSS 파일을 여기서 import하세요
import { awsConfig } from "./aws-exports";

// AWS SDK 초기화
AWS.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.credentials.accessKeyId,
  secretAccessKey: awsConfig.credentials.secretAccessKey,
});

const cloudwatch = new AWS.CloudWatch();
const ec2 = new AWS.EC2();
const rds = new AWS.RDS();

const fetchMetrics = async (
  namespace,
  metricName,
  instanceId,
  dimensionName
) => {
  const params = {
    Namespace: namespace,
    MetricName: metricName,
    Dimensions: [
      {
        Name: dimensionName,
        Value: instanceId,
      },
    ],
    StartTime: new Date(new Date().getTime() - 60 * 60 * 1000),
    EndTime: new Date(),
    Period: 300,
    Statistics: ["Average", "Maximum", "Minimum"],
  };

  return new Promise((resolve, reject) => {
    cloudwatch.getMetricStatistics(params, (err, data) => {
      if (err) reject(err);
      else resolve(data.Datapoints); // 수정된 부분: Datapoints만 반환
    });
  });
};

const Information = () => {
  const [cpuData, setCpuData] = useState({ ec2: null, rds: null });
  const [ec2InstanceType, setEc2InstanceType] = useState("");
  const [rdsInstanceType, setRdsInstanceType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ec2Instances = await ec2.describeInstances().promise();
        const rdsInstances = await rds.describeDBInstances().promise();

        const ec2InstanceId =
          ec2Instances.Reservations[0].Instances[0].InstanceId;
        const rdsInstanceId = rdsInstances.DBInstances[0].DBInstanceIdentifier;

        const ec2Metrics = await fetchMetrics(
          "AWS/EC2",
          "CPUUtilization",
          ec2InstanceId,
          "InstanceId"
        );
        const rdsMetrics = await fetchMetrics(
          "AWS/RDS",
          "CPUUtilization",
          rdsInstanceId,
          "DBInstanceIdentifier"
        );

        setCpuData({
          ec2: ec2Metrics,
          rds: rdsMetrics,
        });

        setEc2InstanceType(
          ec2Instances.Reservations[0].Instances[0].InstanceType
        );
        setRdsInstanceType(rdsInstances.DBInstances[0].DBInstanceClass);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderMetrics = () => {
    // EC2와 RDS 모두 데이터가 없을 경우
    if (!cpuData.ec2 && !cpuData.rds) {
      return <div>No data available</div>;
    }
  
    return (
      <div className="infod">

        {cpuData.ec2 && (
          <div className="Information-container">
            <h2>EC2 인스턴스 CPU 사용량</h2>
            <div className="metric-info">
              {/* 수정된 부분: 데이터가 없는 경우에 대비하여 체크 */}
              <p>평균값: {cpuData.ec2.length > 0 ? cpuData.ec2[0].Average.toFixed(2) : 'N/A'}</p>
              <p>최댓값: {cpuData.ec2.length > 0 ? cpuData.ec2[0].Maximum.toFixed(2) : 'N/A'}</p>
              <p>최솟값: {cpuData.ec2.length > 0 ? cpuData.ec2[0].Minimum.toFixed(2) : 'N/A'}</p>
            </div>
            <p>EC2 인스턴스 유형: {ec2InstanceType}</p>
          </div>
        )}

        {cpuData.rds && (
          <div className="Information-container">
            <h2>RDS 인스턴스 CPU 사용량</h2>
            <div className="metric-info">
              {/* 수정된 부분: 데이터가 없는 경우에 대비하여 체크 */}
              <p>평균값: {cpuData.rds.length > 0 ? cpuData.rds[0].Average.toFixed(2) : 'N/A'}</p>
              <p>최댓값: {cpuData.rds.length > 0 ? cpuData.rds[0].Maximum.toFixed(2) : 'N/A'}</p>
              <p>최솟값: {cpuData.rds.length > 0 ? cpuData.rds[0].Minimum.toFixed(2) : 'N/A'}</p>
            </div>
            <p>RDS 인스턴스 유형: {rdsInstanceType}</p>
           
          </div>
          
        )}
      </div>
    );
  };

  return renderMetrics();
};

export default Information;
