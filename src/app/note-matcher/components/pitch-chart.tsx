import { Bar, BarChart, CartesianGrid, ReferenceArea, YAxis } from "recharts";

import { noteMatcherConfig } from "../config";

const chartConfig = {
    ticks: 6,
    pitchColor: "#ffa500",
    targetColor: "#20c997",
    mutedColor: "rgba(237, 237, 237, 0.7)",
};

type PitchChartProps = {
    pitch: number;
    targetPitch: number;
};

export const PitchChart = (props: PitchChartProps) => {
    const data = [{ time: 0, pitch: props.pitch }];

    const max = 2 * props.targetPitch;
    const ticks = Array.from({ length: chartConfig.ticks }, (_, i) =>
        Math.round((max / (chartConfig.ticks - 1)) * i),
    );

    return (
        <BarChart
            responsive
            data={data}
            style={{ width: "100%", maxWidth: "700px", maxHeight: "70vh", aspectRatio: 1.618 }}
            margin={{ top: 10, bottom: 10, left: 10, right: 60 }}
        >
            <Bar dataKey="pitch" fill={chartConfig.pitchColor} isAnimationActive={false} />
            <YAxis
                allowDataOverflow
                width="auto"
                interval={0}
                domain={[0, max]}
                axisLine={false}
                tickLine={false}
                ticks={ticks}
                tick={{ fill: chartConfig.mutedColor }}
                label={{
                    angle: -90,
                    value: "Pitch [Hz]",
                    position: "insideLeft",
                    style: { textAnchor: "middle", fill: chartConfig.mutedColor },
                }}
            />
            <CartesianGrid stroke={chartConfig.mutedColor} vertical={false} />
            <ReferenceArea
                stroke="none"
                fillOpacity={0.25}
                fill={chartConfig.targetColor}
                y1={props.targetPitch - props.targetPitch * noteMatcherConfig.pitchTolerance}
                y2={props.targetPitch + props.targetPitch * noteMatcherConfig.pitchTolerance}
            />
        </BarChart>
    );
};
