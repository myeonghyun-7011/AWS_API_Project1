import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AWS from "aws-sdk";
import "../css/AccessInfo.css";
import { awsConfig } from "./aws-exports";
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
  const location = useLocation();
  const { selectedRegion } = location.state || {};
  const [ec2Metrics, setEc2Metrics] = useState([]);
  const [rdsMetrics, setRdsMetrics] = useState([]);
  const [currentRegion, setCurrentRegion] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegionName = async () => {
      try {
        AWS.config.update({
          region: awsConfig.region,
          credentials: new AWS.Credentials(
            awsConfig.credentials.accessKeyId,
            awsConfig.credentials.secretAccessKey
          ),
        });

        const ec2 = new AWS.EC2();
        const response = await ec2.describeRegions().promise();
        const regions = response.Regions.map((region) => region.RegionName);

        if (selectedRegion && regions.includes(selectedRegion)) {
          setCurrentRegion(selectedRegion);
          await fetchMetrics(selectedRegion);
        } else {
          setCurrentRegion("Tokyo");
          await fetchMetrics("ap-northeast-1");
        }
      } catch (error) {
        console.error("리전 가져오기 오류:", error);
        setCurrentRegion("Unknown");
      } finally {
        setLoading(false);
      }
    };

    fetchRegionName();
  }, [selectedRegion]);

  const fetchMetrics = async (region) => {
    try {
      const instanceIds = [
        { id: "i-0eefd77085740ba65", name: "redhat", color: "#ff0000" },
        { id: "i-0a07c858371af5e0f", name: "suse", color: "#00ff00" },
        { id: "i-03b30f89868eb4d2f", name: "test1", color: "#0000ff" },
        { id: "i-068d3a5e5489727a7", name: "test123", color: "#ff00ff" },
      ];

      const ec2DataPromises = instanceIds.map(async (instance) => {
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

      const rdsData = await getMetrics(
        "AWS/RDS",
        "DBInstanceIdentifier",
        "mydb12",
        region
      );
      setRdsMetrics(processMetrics(rdsData));
    } catch (error) {
      console.error("지표 가져오기 오류:", error);
    }
  };

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
                ec2Metrics.map((metricData) => `CPUUtilization: ${metricData.name} (평균)`)
              )}
              {renderLineChart(
                combineMetrics(ec2Metrics, "maxCpu"),
                "EC2 CPU 사용률 (최대)",
                ec2Metrics.map((metricData) => `maxCpu${metricData.name}`),
                ec2Metrics.map((metricData) => metricData.color),
                ec2Metrics.map((metricData) => `CPUUtilization: ${metricData.name} (최대)`)
              )}
              {renderLineChart(
                combineMetrics(ec2Metrics, "minCpu"),
                "EC2 CPU 사용률 (최소)",
                ec2Metrics.map((metricData) => `minCpu${metricData.name}`),
                ec2Metrics.map((metricData) => metricData.color),
                ec2Metrics.map((metricData) => `CPUUtilization: ${metricData.name} (최소)`)
              )}
              <div className="chart">
                <h3>RDS CPU 사용률 (평균)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={rdsMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="averageCpu"
                      stroke="#8884d8"
                      name="CPUUtilization: Average"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart">
                <h3>RDS CPU 사용률 (최대)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={rdsMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="maxCpu"
                      stroke="#82ca9d"
                      name="CPUUtilization: Max"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="chart">
                <h3>RDS CPU 사용률 (최소)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={rdsMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="minCpu"
                      stroke="#ffc658"
                      name="CPUUtilization: Min"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccessInfo;
