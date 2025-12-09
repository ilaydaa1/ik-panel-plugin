import React from 'react';
import { PanelProps, FieldType } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}
const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
      overflow: hidden;
      padding: 12px;
    `,
    content: css`
      position: relative;
      z-index: 1;
    `,
    svg: css`
      position: absolute;
      top: 50%;
      right: 16px;
      transform: translateY(-50%);
      opacity: 0.25;
    `,
    textBox: css`
      margin-top: 12px;
    `,
  };
};


export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }
    const series = data.series[0];
  let avg: number | null = null;

  if (series) {
    // İlk sayısal (number) alanı bul
    const numberField = series.fields.find(f => f.type === FieldType.number);

    if (numberField) {
      const values = numberField.values.toArray() as number[];
      if (values.length > 0) {
        const sum = values.reduce((a, b) => a + b, 0);
        avg = sum / values.length;
      }
    }
  }

 return (
  <div
    className={cx(
      styles.wrapper,
      css`
        width: ${width}px;
        height: ${height}px;
      `
    )}
  >
    {/* Yazılar */}
    <div className={styles.content}>
      <h2>Developed by İlayda Karahan – Fall 2025</h2>
      <p>This is my first Grafana panel plugin.</p>

      {avg !== null && (
        <div style={{ marginTop: '8px' }}>
          Average value from query: <strong>{avg.toFixed(2)}</strong>
        </div>
      )}

      <div className={styles.textBox}>
        {options.showSeriesCount && (
          <div data-testid="simple-panel-series-counter">
            Number of series: {data.series.length}
          </div>
        )}
        <div>Text option value: {options.text}</div>
      </div>
    </div>

    {/* Arka plandaki daire */}
    <svg
      className={styles.svg}
      width={height}       // kare dursun diye
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`-${height / 2} -${height / 2} ${height} ${height}`}
    >
      <g>
        <circle
          data-testid="simple-panel-circle"
          style={{ fill: theme.colors.primary.main }}
          r={height / 3}
        />
      </g>
    </svg>
  </div>
);

};
