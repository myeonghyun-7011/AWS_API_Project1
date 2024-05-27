import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "../css/AccessInfo.css";
import LoadingAccessInfo from "./components/LoadingAccessInfo";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AccessInfo = () => {
  const [ec2InstanceIds, setEc2InstanceIds] = useState([]);
  const [rdsInstanceIds, setRdsInstanceIds] = useState([]);
  const [ec2Metrics, setEc2Metrics] = useState([]);
  const [rdsMetrics, setRdsMetrics] = useState([]);
  const [currentRegion, setCurrentRegion] = useState("ap-northeast-1");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstanceIds = async () => {

      // -----------------------------------------------------------------------------------------------

      const ec2 = new AWS.EC2();
      const ec2Params = {
        Filters: [{ Name: "instance-state-name", Values: ["running"] }],
      };

      try {
        const ec2Data = await ec2.describeInstances(ec2Params).promise();
        const ec2Instances = ec2Data.Reservations.flatMap(
          (reservation, index) =>
            reservation.Instances.map((instance) => ({
              id: instance.InstanceId,
              name:
                instance.Tags.find((tag) => tag.Key === "Name")?.Value ||
                instance.InstanceId,
              color: getRandomColor(index), // EC2 인스턴스별로 랜덤 색상 할당
            }))
        );
        setEc2InstanceIds(ec2Instances);
      } catch (error) {
        console.error("EC2 인스턴스 ID 가져오기 오류:", error);
      }

      // --------------------------------------------------------------------------------------

      const rds = new AWS.RDS();
      const rdsParams = {};

      try {
        const rdsData = await rds.describeDBInstances(rdsParams).promise();
        const rdsInstances = rdsData.DBInstances.map((instance, index) => ({
          id: instance.DBInstanceIdentifier,
          name: instance.DBInstanceIdentifier,
          color: getRandomColor(index), // RDS 인스턴스별로 랜덤 색상 할당
        }));
        setRdsInstanceIds(rdsInstances);
      } catch (error) {
        console.error("RDS 인스턴스 ID 가져오기 오류:", error);
      }
    };

    // ----------------------------------------------------------------------------------------------
    fetchInstanceIds();
  }, []);

  useEffect(() => {
    const fetchMetrics = async (region) => {
      if (ec2InstanceIds.length === 0 && rdsInstanceIds.length === 0) return;

      try {
        // EC2 지표 가져오기
        const ec2DataPromises = ec2InstanceIds.map(async (instance) => {
          const ec2Data = await getMetrics(
            "AWS/EC2",
            "InstanceId",
            instance.id,
            region
          );
          return { name: instance.name, color: instance.color, data: ec2Data };
        });

        const ec2DataResults = await Promise.all(ec2DataPromises);

        const ec2MetricsData = ec2DataResults.map((instanceData) => ({
          name: instanceData.name,
          color: instanceData.color,
          metrics: processMetrics(instanceData.data),
        }));

        setEc2Metrics(ec2MetricsData);

        // RDS 지표 가져오기
        const rdsDataPromises = rdsInstanceIds.map(async (instance) => {
          const rdsData = await getMetrics(
            "AWS/RDS",
            "DBInstanceIdentifier",
            instance.id,
            region
          );
          return { name: instance.name, color: instance.color, data: rdsData };
        });

        const rdsDataResults = await Promise.all(rdsDataPromises);

        const rdsMetricsData = rdsDataResults.map((instanceData) => ({
          name: instanceData.name,
          color: instanceData.color,
          metrics: processMetrics(instanceData.data),
        }));

        setRdsMetrics(rdsMetricsData);
      } catch (error) {
        console.error("지표 가져오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics(currentRegion);
  }, [currentRegion, ec2InstanceIds, rdsInstanceIds]);

  const getMetrics = async (
    namespace,
    dimensionName,
    dimensionValue,
    region
  ) => {
    const cloudWatch = new AWS.CloudWatch({ region });
    const startTime = new Date("2024-05-01T00:00:00Z");
    const endTime = new Date();

    const params = {
      StartTime: startTime,
      EndTime: endTime,
      MetricDataQueries: [
        {
          Id: "averageCpuUtilization",
          MetricStat: {
            Metric: {
              Namespace: namespace,
              MetricName: "CPUUtilization",
              Dimensions: [
                {
                  Name: dimensionName,
                  Value: dimensionValue,
                },
              ],
            },
            Period: 86400,
            Stat: "Average",
          },
          ReturnData: true,
        },
        {
          Id: "maxCpuUtilization",
          MetricStat: {
            Metric: {
              Namespace: namespace,
              MetricName: "CPUUtilization",
              Dimensions: [
                {
                  Name: dimensionName,
                  Value: dimensionValue,
                },
              ],
            },
            Period: 86400,
            Stat: "Maximum",
          },
          ReturnData: true,
        },
        {
          Id: "minCpuUtilization",
          MetricStat: {
            Metric: {
              Namespace: namespace,
              MetricName: "CPUUtilization",
              Dimensions: [
                {
                  Name: dimensionName,
                  Value: dimensionValue,
                },
              ],
            },
            Period: 86400,
            Stat: "Minimum",
          },
          ReturnData: true,
        },
      ],
    };

    return new Promise((resolve, reject) => {
      cloudWatch.getMetricData(params, (err, data) => {
        if (err) {
          console.error("지표 가져오기 오류:", err);
          reject(err);
        } else {
          resolve(data.MetricDataResults);
        }
      });
    });
  };

  const processMetrics = (data) => {
    const result = [];
    const timestamps = data[0]?.Timestamps || [];

    timestamps.sort((a, b) => new Date(a) - new Date(b));

    timestamps.forEach((timestamp, index) => {
      const date = new Date(timestamp);
      const entry = { date };
      data.forEach((metric) => {
        const id = metric.Id.replace(/Utilization/g, "");
        entry[id] = metric.Values[index];
      });
      result.push(entry);
    });
    return result;
  };

  const renderLineChart = (metrics, title, dataKeys, strokeColors, names) => (
    <div className="chart">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((dataKey, index) => (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              stroke={strokeColors[index]}
              name={names[index]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const combineMetrics = (metrics, key) => {
    const combined = [];
    metrics.forEach((metricData) => {
      metricData.metrics.forEach((metric) => {
        const existing = combined.find((m) => m.date === metric.date);
        if (existing) {
          existing[`${key}${metricData.name}`] = metric[key];
        } else {
          combined.push({
            date: metric.date,
            [`${key}${metricData.name}`]: metric[key],
          });
        }
      });
    });
    return combined;
  };

  // 랜덤 색상을 생성하는 함수
  const getRandomColor = (index) => {
    const colors = [
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#8dd1e1",
      "#a4de6c",
      "#d0ed57",
      "#ff6961",
      "#ff5051",
    ];

    return colors[index % colors.length];
  };

  return (
    <div className="info">
      {loading ? (
        <LoadingAccessInfo />
      ) : (
        <>
          <h2>사용자 정보</h2>
          <div>
            <p>
              <b>리전 :</b> {currentRegion}
            </p>
          </div>
          <div className="chart-container">
            <div className="dashboard">
              {renderLineChart(
                combineMetrics(ec2Metrics, "averageCpu"),
                "EC2 CPU 사용률 (평균)",
                ec2Metrics.map((metricData) => `averageCpu${metricData.name}`),
                ec2Metrics.map((metricData) => metricData.color),
                ec2Metrics.map(
                  (metricData) => `CPUUtilization: ${metricData.name} (평균)`
                )
              )}
              {renderLineChart(
                combineMetrics(ec2Metrics, "maxCpu"),
                "EC2 CPU 사용률 (최대)",
                ec2Metrics.map((metricData) => `maxCpu${metricData.name}`),
                ec2Metrics.map((metricData) => metricData.color),
                ec2Metrics.map(
                  (metricData) => `CPUUtilization: ${metricData.name} (최대)`
                )
              )}
              {renderLineChart(
                combineMetrics(ec2Metrics, "minCpu"),
                "EC2 CPU 사용률 (최소)",
                ec2Metrics.map((metricData) => `minCpu${metricData.name}`),
                ec2Metrics.map((metricData) => metricData.color),
                ec2Metrics.map(
                  (metricData) => `CPUUtilization: ${metricData.name} (최소)`
                )
              )}
              {renderLineChart(
                combineMetrics(rdsMetrics, "averageCpu"),
                "RDS CPU 사용률 (평균)",
                rdsMetrics.map((metricData) => `averageCpu${metricData.name}`),
                rdsMetrics.map((metricData) => metricData.color),
                rdsMetrics.map(
                  (metricData) => `CPUUtilization: ${metricData.name} (평균)`
                )
              )}
              {renderLineChart(
                combineMetrics(rdsMetrics, "maxCpu"),
                "RDS CPU 사용률 (최대)",
                rdsMetrics.map((metricData) => `maxCpu${metricData.name}`),
                rdsMetrics.map((metricData) => metricData.color),
                rdsMetrics.map(
                  (metricData) => `CPUUtilization: ${metricData.name} (최대)`
                )
              )}
              {renderLineChart(
                combineMetrics(rdsMetrics, "minCpu"),
                "RDS CPU 사용률 (최소)",
                rdsMetrics.map((metricData) => `minCpu${metricData.name}`),
                rdsMetrics.map((metricData) => metricData.color),
                rdsMetrics.map(
                  (metricData) => `CPUUtilization: ${metricData.name} (최소)`
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccessInfo;
