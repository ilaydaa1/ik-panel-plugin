# IK Panel Plugin for Grafana

A custom Grafana panel plugin developed to analyze query results and provide
rule-based insights directly within Grafana dashboards.

The plugin is containerized, successfully built, and loaded into Grafana
as a visualization panel.

The panel UI explicitly displays developer attribution:
**“Developed by Ilayda Karahan – Fall 2025”**

## Core Functionality
- Reads real query results from Grafana data sources
- Processes numeric fields from query outputs
- Calculates and displays:
  - Average value
  - Current value
  - Minimum and maximum values

## Rule-Based Analysis
The plugin performs rule-based analysis on query data:
- System state classification based on average value:
  - **LOW / NORMAL / HIGH**
- Trend and volatility interpretation based on min–max difference
- Anomaly detection using a dynamic threshold

## User Interaction & UI
- Show / hide details functionality
- Hover animations and visual feedback
- Responsive layout adapting to different panel and screen sizes
- Meaningful empty-state screen when no data is available

## Panel Configuration Options
Each panel instance can be configured independently via Grafana:
- Custom text input
- Color picker
- Compact mode toggle
- Series counter enable / disable

## Tech Stack
- TypeScript
- Grafana Plugin SDK
- Docker
- CSS Modules

## Build & Deployment
- Builds without errors
- Successfully loaded into Grafana
- Available as a visualization in Grafana dashboards

