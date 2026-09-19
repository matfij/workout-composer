import { Bar, BarChart, CartesianGrid, ReferenceArea, YAxis } from "recharts";

type PitchChartProps = {
    pitch: number;
    targetPitch: number;
    tolerance: number;
};

const TICKS_COUNT = 6;

const BAR_COLOR = "#ffa500";
const TOLERANCE_COLOR = "#20c997";
const MUTED_COLOR = "rgba(237, 237, 237, 0.7)";

export const PitchChart = (props: PitchChartProps) => {
    const data = [{ time: 0, pitch: props.pitch }];

    const max = 2 * props.targetPitch;
    const ticks = Array.from({ length: TICKS_COUNT }, (_, i) =>
        Math.round((max / (TICKS_COUNT - 1)) * i),
    );

    return (
        <BarChart
            responsive
            data={data}
            style={{ width: "100%", maxWidth: "700px", maxHeight: "70vh", aspectRatio: 1.618 }}
            margin={{ top: 10, bottom: 10, left: 10, right: 60 }}
        >
            <Bar dataKey="pitch" fill={BAR_COLOR} isAnimationActive={false} />
            <YAxis
                allowDataOverflow
                width="auto"
                interval={0}
                domain={[0, max]}
                axisLine={false}
                tickLine={false}
                ticks={ticks}
                tick={{ fill: MUTED_COLOR }}
                label={{
                    angle: -90,
                    value: "Pitch [Hz]",
                    position: "insideLeft",
                    style: { textAnchor: "middle", fill: MUTED_COLOR },
                }}
            />
            <CartesianGrid stroke={MUTED_COLOR} vertical={false} />
            <ReferenceArea
                y1={props.targetPitch - props.tolerance}
                y2={props.targetPitch + props.tolerance}
                fill={TOLERANCE_COLOR}
                fillOpacity={0.25}
                stroke="none"
            />
        </BarChart>
    );
};
