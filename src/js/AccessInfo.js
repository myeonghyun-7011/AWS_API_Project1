import React, { useEffect, useState } from 'react';
import '../css/AccessInfo.css';

const AccessInfo = () => {
    const [metricValues, setMetricValues] = useState(null);
    
    useEffect(() => {
        // 여기에 AWS 정보를 가져오는 코드를 작성합니다.
        // 해당 코드는 AWS 정보를 가져와서 metricValues를 설정합니다.
        // ...

        // 예시 데이터로 대체합니다.
        setMetricValues({
            min_metric_value: 10,
            max_metric_value: 100,
            avg_metric_value: 50
        });
    }, []);

    return (
        <div className="access-info-container">
            <h2>Access Information</h2>
            {metricValues ? (
                <div className="metric-values">
                    <p>Min Metric Value: {metricValues.min_metric_value}</p>
                    <p>Max Metric Value: {metricValues.max_metric_value}</p>
                    <p>Average Metric Value: {metricValues.avg_metric_value}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AccessInfo;
