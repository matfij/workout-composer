import { Area, Bar, BarChart, CartesianGrid, ReferenceLine, YAxis } from "recharts";

type PitchChartProps = {
    pitch: number;
    targetPitch: number;
    tolerance: number;
};

const TICK_COUNT = 6;

export const PitchChart = (props: PitchChartProps) => {
    const data = [{ time: 0, pitch: props.pitch }];

    const max = 2 * props.targetPitch;
    const ticks = Array.from({ length: TICK_COUNT }, (_, i) =>
        Math.round((max / (TICK_COUNT - 1)) * i),
    );

    return (
        <BarChart
            responsive
            data={data}

            style={{ width: "100%", maxWidth: "700px", maxHeight: "70vh", aspectRatio: 1.618 }}
        >
            <Bar dataKey="pitch" fill="#ffa500" isAnimationActive={false} />
            <YAxis
                allowDataOverflow
                width="auto"
                domain={[0, max]}
                ticks={ticks}
                label={{
                    value: "Pitch [Hz]",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                }}
            />
            <CartesianGrid />
            <ReferenceLine
                y={props.targetPitch + props.tolerance}
                stroke="#ededed"
                strokeDasharray="6 4"
            />
            <ReferenceLine
                y={props.targetPitch - props.tolerance}
                stroke="#ededed"
                strokeDasharray="6 4"
            />
            <Area dataKey={(x) => x} />
        </BarChart>
    );
};
