import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import React from 'react';
import {loadFont} from '@remotion/google-fonts/Roboto';

import {Mafs, Point, Coordinates} from 'mafs';

import 'mafs/core.css';

const {fontFamily} = loadFont();

const title: React.CSSProperties = {
	fontFamily,
	fontSize: 80,
	fontWeight: 'bold',
};

const text: React.CSSProperties = {
	fontWeight: 'bold',
	fontFamily,
	fontSize: 40,
	color: '#4290F5',
};

const disappearBeforeEnd = 20;

export const Overlay: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const myX = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const out = spring({
		fps,
		frame: frame - durationInFrames + disappearBeforeEnd,
		config: {
			damping: 200,
		},
		durationInFrames: disappearBeforeEnd,
	});

	const myY = interpolate(out, [0, 1], [0, 3]);

	const container: React.CSSProperties = {
		position: 'absolute',
		backgroundColor: 'white',
		borderRadius: 25,
		right: 450,
		top: 90,
		width: 1000,
		padding: 40,
	};

	return (
		<AbsoluteFill>
			<div style={container}>
				<div style={title}>Mafs Animation</div>
				<div style={text}>made with Remotion</div>
				<Mafs>
					<Coordinates.Cartesian />
					<Point x={myX} y={myY} />
				</Mafs>
			</div>
		</AbsoluteFill>
	);
};
