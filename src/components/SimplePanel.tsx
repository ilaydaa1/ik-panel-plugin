import React, { useMemo, useState } from 'react';
import { PanelProps, FieldType } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';
import { SimpleOptions } from 'types';
import styles from './SimplePanel.module.css';


type Props = PanelProps<SimpleOptions>;

const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme2();
  const [showDetails, setShowDetails] = useState(true);

  const numericField = useMemo(() => {
    const frame = data.series[0];
    if (!frame) {
      return undefined;
    }
    return frame.fields.find((f) => f.type === FieldType.number);
  }, [data.series]);

  const stats = useMemo(() => {
    if (!numericField || numericField.values.length === 0) {
      return undefined;
    }

    const values = numericField.values
      .toArray()
      .filter((v) => typeof v === 'number') as number[];

    if (!values.length) {
      return undefined;
    }

    const sum = values.reduce((acc, v) => acc + v, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const current = values[values.length - 1];

    return { avg, min, max, current };
  }, [numericField]);

  const analysis = useMemo(() => {
    if (!stats) {
      return {
        statusLabel: 'NO DATA',
        statusText: 'No numeric data in query result.',
        trendText: 'Trend: N/A',
        anomaliesText: 'Anomalies: N/A',
        statusTone: 'normal' as 'low' | 'normal' | 'high',
      };
    }

    const { avg, min, max } = stats;

    let statusLabel = 'NORMAL';
    let statusText = 'Pipelines are running in the normal range.';
    let statusTone: 'low' | 'normal' | 'high' = 'normal';

    if (avg < 30) {
      statusLabel = 'LOW';
      statusText = 'Activity is low – pipelines are mostly idle or healthy.';
      statusTone = 'low';
    } else if (avg > 70) {
      statusLabel = 'HIGH';
      statusText = 'High activity detected – system might be under heavy load.';
      statusTone = 'high';
    }

    const volatility = max - min;
    const trendText =
      volatility > 40
        ? 'Trend: highly volatile pipeline behaviour.'
        : volatility > 20
        ? 'Trend: moderate fluctuations in pipeline activity.'
        : 'Trend: stable pipeline values.';

    const anomalyThreshold = avg + 25;
    const anomalyCount = numericField
      ? numericField.values
          .toArray()
          .filter(
            (v) => typeof v === 'number' && (v as number) > anomalyThreshold
          ).length
      : 0;

    const anomaliesText =
      anomalyCount === 0
        ? 'No anomalies detected outside the expected range.'
        : `Detected ${anomalyCount} anomalies above the expected range.`;

    return { statusLabel, statusText, trendText, anomaliesText, statusTone };
  }, [stats, numericField]);

  const highlightColor = options.highlightColor || theme.colors.primary.main;

  if (!numericField || !stats) {
  return (
    <div className={styles.emptyState} style={{ height, width }}>
      <div className={styles.emptyTitle}>
        CI/CD Pipeline Health – No data
      </div>
      <div className={styles.emptyText}>
        This panel shows a smart summary of DevOps pipeline health.
        Add a numeric time-series query to see the analysis here.
      </div>
      <div className={styles.footerText}>
        Text option value:{' '}
        <span className={styles.emphasis}>
          {options.simpleText || 'Default value of text input option'}
        </span>
      </div>
    </div>
  );
}


  const { avg, min, max, current } = stats;

  return (
    <div
      className={`${styles.wrapper} ${
        options.compactMode ? styles.compact : ''
      }`}
      style={{ height, width }}
    >
      <div className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <div className={styles.statusBadge} data-tone={analysis.statusTone}>
            <span className={styles.statusDot} />
            <span className={styles.statusLabel}>{analysis.statusLabel}</span>
          </div>
          <div className={styles.mainTitle}>
            Developed by Ilayda Karahan – Fall 2025
          </div>
          <div className={styles.subTitle}>
            This is my first Grafana panel plugin. Smart summary based on query
            data.
          </div>
        </div>

        <div className={styles.circleBlock}>
          <div
            className={styles.circle}
            style={{ backgroundColor: highlightColor }}
          />
          {options.showSeriesCounter && (
            <div className={styles.circleCaption}>
              {data.series.length} series in query
            </div>
          )}
        </div>
      </div>

      <div className={styles.metricsRow}>
        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Average value from query</div>
          <div className={styles.metricValue}>{avg.toFixed(2)}</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>Current value</div>
          <div className={styles.metricValue}>{current.toFixed(2)}</div>
          <div className={styles.metricHint}>
            Min / Max: {min.toFixed(2)} / {max.toFixed(2)}
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricLabel}>AI style analysis</div>
          <div className={styles.metricValueSmall}>{analysis.statusText}</div>
        </div>
      </div>

      <div
        className={styles.detailsToggle}
        onClick={() => setShowDetails((s) => !s)}
      >
        {showDetails ? 'Click to hide details' : 'Click to show details'}
      </div>

      {showDetails && (
        <div className={styles.detailsRow}>
          <div className={styles.detailLine}>{analysis.trendText}</div>
          <div className={styles.detailLine}>{analysis.anomaliesText}</div>
          <div className={styles.detailLine}>
            Text option value:{' '}
            <span className={styles.emphasis}>
              {options.simpleText || 'Default value of text input option'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimplePanel;
