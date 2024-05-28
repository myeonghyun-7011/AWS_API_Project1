import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import { useLocation } from 'react-router-dom';
import "../css/Information.css";

const cloudwatch = new AWS.CloudWatch();
const ec2 = new AWS.EC2();
const rds = new AWS.RDS();

const Information = () => {
  const location = useLocation();
  const { accessKeyId, secretAccessKey, currentRegion } = location.state;

  useEffect(() => {
    AWS.config.update({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: currentRegion,
    });
  }, [accessKeyId, secretAccessKey, currentRegion]);

  const [loading, setLoading] = useState(true);
  const [cpuData, setCpuData] = useState([]);
  const [instanceTypes, setInstanceTypes] = useState({});
  const [rdsData, setRdsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ec2InstanceData = await ec2.describeInstances().promise();
        const ec2Instances = ec2InstanceData.Reservations.flatMap(
          (reservation) => reservation.Instances
        ).filter((instance) => instance.State.Name === "running");

        const ec2DataPromises = ec2Instances.map(async (instance) => {
          const ec2Metrics = await fetchMetrics(
            "AWS/EC2",
            "CPUUtilization",
            instance.InstanceId,
            "InstanceId"
          );
          return {
            id: instance.InstanceId,
            name: instance.Tags.find((tag) => tag.Key === "Name").Value,
            metrics: ec2Metrics,
          };
        });

        const ec2Data = await Promise.all(ec2DataPromises);
        setCpuData(ec2Data);

        const ec2InstanceTypes = {};
        ec2Instances.forEach((instance) => {
          ec2InstanceTypes[instance.InstanceId] = instance.InstanceType;
        });
        setInstanceTypes(ec2InstanceTypes);

        const rdsInstanceData = await rds.describeDBInstances().promise();
        const rdsInstances = rdsInstanceData.DBInstances.filter(
          (instance) => instance.DBInstanceStatus === "available"
        );

        const rdsDataPromises = rdsInstances.map(async (instance) => {
          const rdsMetrics = await fetchMetrics(
            "AWS/RDS",
            "CPUUtilization",
            instance.DBInstanceIdentifier,
            "DBInstanceIdentifier"
          );
          return { id: instance.DBInstanceIdentifier, engine: instance.Engine, metrics: rdsMetrics };
        });

        const rdsData = await Promise.all(rdsDataPromises);
        setRdsData(rdsData);

        setLoading(false); // Data fetching completed
      } catch (error) {
        console.error("Error fetching data:", error);
        // Show error message to the user
      }
    };

    fetchData();
  }, []);

  const fetchMetrics = async (
    namespace,
    metricName,
    instanceId,
    dimensionName
  ) => {
    const startDate = new Date(new Date().getFullYear(), 4, 1); // May 1st

    const params = {
      Namespace: namespace,
      MetricName: metricName,
      Dimensions: [
        {
          Name: dimensionName,
          Value: instanceId,
        },
      ],
      StartTime: startDate,
      EndTime: new Date(),
      Period: 3600, // 1-hour interval
      Statistics: ["Average", "Maximum", "Minimum"],
    };

    return new Promise((resolve, reject) => {
      cloudwatch.getMetricStatistics(params, (err, data) => {
        if (err) reject(err);
        else resolve(data.Datapoints);
      });
    });
  };

  const calculateStatistics = (data) => {
    if (!data || data.length === 0) {
      return { average: "N/A", maximum: "N/A", minimum: "N/A" };
    }

    let sum = 0;
    let max = -Infinity;
    let min = Infinity;

    data.forEach((point) => {
      if (point && point.Average && point.Maximum && point.Minimum) {
        sum += point.Average;
        if (point.Maximum > max) max = point.Maximum;
        if (point.Minimum < min) min = point.Minimum;
      }
    });
  
    const average = (sum / data.length).toFixed(2);
    return {
      average: average,
      maximum: max !== -Infinity ? max.toFixed(2) : "N/A",
      minimum: min !== Infinity ? min.toFixed(2) : "N/A",
    };
  };

  const renderMetrics = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (cpuData.length === 0 && rdsData.length === 0) {
      return <div>No data available</div>;
    }

    return (
      <div className="infod">
        {/* EC2 인스턴스 데이터 */}
        {cpuData.map((instance) => (
          <div key={instance.id} className="Information-container">
            <h2>
              <span className="highlight">EC2</span> 인스턴스 CPU 사용량 {" "}
              <br />
              <span>인스턴스 이름 :</span>{instance.name}
            </h2>
            <div className="metric-info">
              <p className="info-p">
                평균값 :{" "}
                <span className="custom-color">
                  {calculateStatistics(instance.metrics).average}
                </span>
              </p>
              <p className="info-p">
                최댓값 :{" "}
                <span className="custom-color">
                  {calculateStatistics(instance.metrics).maximum}
                </span>
              </p>
              <p className="info-p">
                최솟값 :{" "}
                <span className="custom-color">
                  {calculateStatistics(instance.metrics).minimum}
                </span>
              </p>
            </div>
            <p className="info-p">
              EC2 인스턴스 유형 :{" "}
              <span className="custom-color">{instanceTypes[instance.id]}</span>
            </p>
          </div>
        ))}
    
        {/* RDS 인스턴스 데이터 */}
        {rdsData.map((instance) => (
          <div key={instance.id} className="Information-container">
            <h2>
              <span className="highlight">RDS</span> 인스턴스 CPU 사용량 {" "}
              <br />
              <span>DB-인스턴스 이름 :</span>{instance.id}
              <br />
              <span>DB-엔진 유형 :</span>{instance.engine}
               
            </h2>
            <div className="metric-info">
              <p className="info-p">
                평균값 :{" "}
                <span className="custom-color">
                  {calculateStatistics(instance.metrics).average}
                </span>
              </p>
              <p className="info-p">
                최댓값 :{" "}
                <span className="custom-color">
                  {calculateStatistics(instance.metrics).maximum}
                </span>
              </p>
              <p className="info-p">
                최솟값 :{" "}
                <span className="custom-color">
                  {calculateStatistics(instance.metrics).minimum}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  
  };

  return renderMetrics();
};

export default Information;