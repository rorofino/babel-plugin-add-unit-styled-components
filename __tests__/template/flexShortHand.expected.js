import { View } from 'react-native';
import styled, { keyframes } from 'styled-components';

const progressAnimation = keyframes`
	0% {
		background-position: -200px 0;
	}
	100% {
		background-position: calc(200px + 100%) 0;
	}
`;

const LoadingSkeleton = styled(View)`
	top: 10px;
	right: 5px;
	flex: 1 1 300px;
`;

export default LoadingSkeleton;