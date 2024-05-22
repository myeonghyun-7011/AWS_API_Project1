import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "../css/Information.css"; 
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
    StartTime: new Date(new Date().getFullYear(), 4, 1), // 5월 1일로 설정 (월은 0부터 시작하므로 4는 5월)
    EndTime: new Date(),
    Period: 3600, // 1시간 간격
    Statistics: ["Average", "Maximum", "Minimum"],
  };

  return new Promise((resolve, reject) => {
    cloudwatch.getMetricStatistics(params, (err, data) => {
      if (err) reject(err);
      else resolve(data.Datapoints); 
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
        const ec2InstanceId = "i-03b30f89868eb4d2f";
        const rdsInstanceId = "mydb12";

        const ec2InstanceData = await ec2
          .describeInstances({ InstanceIds: [ec2InstanceId] })
          .promise();
        const rdsInstanceData = await rds
          .describeDBInstances({ DBInstanceIdentifier: rdsInstanceId })
          .promise();

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
          ec2InstanceData.Reservations[0].Instances[0].InstanceType
        );
        setRdsInstanceType(rdsInstanceData.DBInstances[0].DBInstanceClass);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const calculateStatistics = (data) => {
    if (!data || data.length === 0) {
      return { average: "N/A", maximum: "N/A", minimum: "N/A" };
    }

    let sum = 0;
    let max = -Infinity;
    let min = Infinity;

    data.forEach((point) => {
      sum += point.Average;
      if (point.Maximum > max) max = point.Maximum;
      if (point.Minimum < min) min = point.Minimum;
    });

    const average = (sum / data.length).toFixed(2);
    return {
      average: average,
      maximum: max.toFixed(2),
      minimum: min.toFixed(2),
    };
  };

  const renderMetrics = () => {
    if (!cpuData.ec2 && !cpuData.rds) {
      return <div>No data available</div>;
    }

    const ec2Stats = calculateStatistics(cpuData.ec2);
    const rdsStats = calculateStatistics(cpuData.rds);

    return (
      <div className="infod">
        {cpuData.ec2 && (
          <div className="Information-container">
            <h2>EC2 인스턴스 CPU 사용량</h2>
            <div className="metric-info">
              <p>평균값: {ec2Stats.average}</p>
              <p>최댓값: {ec2Stats.maximum}</p>
              <p>최솟값: {ec2Stats.minimum}</p>
            </div>
            <p>EC2 인스턴스 유형: {ec2InstanceType}</p>
          </div>
        )}

        {cpuData.rds && (
          <div className="Information-container">
            <h2>RDS 인스턴스 CPU 사용량</h2>
            <div className="metric-info">
              <p>평균값: {rdsStats.average}</p>
              <p>최댓값: {rdsStats.maximum}</p>
              <p>최솟값: {rdsStats.minimum}</p>
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
