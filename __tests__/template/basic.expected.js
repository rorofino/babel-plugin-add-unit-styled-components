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
	animation: ${progressAnimation} 1.2s ease-in-out infinite;
	background-color: #e4e4e4;
	background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
	background-size: 200px 100%;
	background-repeat: no-repeat;
	width: ${props => props.width || `100%`};
	height: ${props => props.height || `100%`};
	border-radius: 5px;
	margin-bottom: ${props => props.mb || 0};
`;

const SimpleDiv = styled.div`
	top: 10px;
	right: 5px;
`;

export default LoadingSkeleton;