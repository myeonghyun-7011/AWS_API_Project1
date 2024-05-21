import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AWS from "aws-sdk";
import "../css/AccessInfo.css";
import { awsConfig } from "./aws-exports";
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
          fetchMetrics(selectedRegion);
        } else {
          setCurrentRegion("Tokyo");
          fetchMetrics("ap-northeast-1");
        }
      } catch (error) {
        console.error("리전 가져오기 오류:", error);
        setCurrentRegion("Unknown");
      }
    };

    fetchRegionName();
  }, [selectedRegion]);

  const fetchMetrics = async (region) => {
    try {
      const ec2Data = await getMetrics(
        "AWS/EC2",
        "InstanceId",
        "i-03b30f89868eb4d2f",
        region
      );
      const rdsData = await getMetrics(
        "AWS/RDS",
        "DBInstanceIdentifier",
        "mydb12",
        region
      );

      setEc2Metrics(processMetrics(ec2Data));
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
            Period: 86400, // 하루 단위로 지표 가져오기
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
            Period: 86400, // 하루 단위로 지표 가져오기
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
            Period: 86400, // 하루 단위로 지표 가져오기
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

    // 날짜를 기준으로 정렬
    timestamps.sort((a, b) => new Date(a) - new Date(b));

    timestamps.forEach((timestamp, index) => {
      const date = new Date(timestamp);
      const day = `${date.getMonth() + 1}/${date.getDate()}`;
      const entry = { date };
      data.forEach((metric) => {
        const id = metric.Id.replace(/Utilization/g, "");
        entry[id] = metric.Values[index];
      });
      result.push(entry);
    });
    return result;
  };

  const renderLineChart = (metrics, title, dataKey, strokeColor, name) => (
    <div className="chart">
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            name={name}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  return (
    <div className="info">
      <h2>사용자 정보</h2>
      <div>
        <p>
          <b>지역:</b> {currentRegion}
        </p>
      </div>
      <div className="chart-container">
        <div className="dashboard">
          <div className="chart">
            <h3>EC2 CPU 사용률 (평균)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ec2Metrics}>
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
            <h3>EC2 CPU 사용률 (최대)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ec2Metrics}>
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
            <h3>EC2 CPU 사용률 (최소)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ec2Metrics}>
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
    </div>
  );
};

export default AccessInfo;
