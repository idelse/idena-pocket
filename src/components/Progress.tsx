import * as React from "react";
import styled from "styled-components";
import { colors } from "../helpers";


const Progress = styled.div`
	.percent50 {
		width: 50%;
	}
	.percent100 {
		width: 100%;
	}
	.percent33 {
		width: 33.33%;
	}
	.percent66 {
		width: 66.66%;
	}
	.percent80 {
		width: 80%;
	}
	.percent0 {
		width: 0%;
	}
	.meter { 
			height: 5px;  /* Can be anything */
			position: relative;
			width: 50%;
			margin: 20px auto 20px auto; /* Just for demo spacing */
			background: #dfdfdf;
			-moz-border-radius: 25px;
			-webkit-border-radius: 25px;
			border-radius: 25px;
			padding: 2px;
			-webkit-box-shadow: inset 0 -1px 1px rgba(255,255,255,0.3);
			-moz-box-shadow   : inset 0 -1px 1px rgba(255,255,255,0.3);
			box-shadow        : inset 0 -1px 1px rgba(255,255,255,0.3);
		}
		.meter > span {
			display: block;
			height: 100%;
			-webkit-border-radius: 20px;
			-moz-border-radius: 20px;
			border-radius: 20px;
			background-color: #444;
			position: relative;
			overflow: hidden;
		}
		.meter > span:after, .animate > span > span {
			content: "";
			position: absolute;
			top: 0; left: 0; bottom: 0; right: 0;
			background-image: 
			   -webkit-gradient(linear, 0 0, 100% 100%, 
			      color-stop(.25, rgba(255, 255, 255, .2)), 
			      color-stop(.25, transparent), color-stop(.5, transparent), 
			      color-stop(.5, rgba(255, 255, 255, .2)), 
			      color-stop(.75, rgba(255, 255, 255, .2)), 
			      color-stop(.75, transparent), to(transparent)
			   );
			background-image: 
				-moz-linear-gradient(
				  -45deg, 
			      rgba(255, 255, 255, .2) 25%, 
			      transparent 25%, 
			      transparent 50%, 
			      rgba(255, 255, 255, .2) 50%, 
			      rgba(255, 255, 255, .2) 75%, 
			      transparent 75%, 
			      transparent
			   );
			z-index: 1;
			-webkit-background-size: 50px 50px;
			-moz-background-size: 50px 50px;
			-webkit-animation: move 2s linear infinite;
			   -webkit-border-top-right-radius: 8px;
			-webkit-border-bottom-right-radius: 8px;
			       -moz-border-radius-topright: 8px;
			    -moz-border-radius-bottomright: 8px;
			           border-top-right-radius: 8px;
			        border-bottom-right-radius: 8px;
			    -webkit-border-top-left-radius: 20px;
			 -webkit-border-bottom-left-radius: 20px;
			        -moz-border-radius-topleft: 20px;
			     -moz-border-radius-bottomleft: 20px;
			            border-top-left-radius: 20px;
			         border-bottom-left-radius: 20px;
			overflow: hidden;
		}
		
		.animate > span:after {
			display: none;
		}
		
		@-webkit-keyframes move {
		    0% {
		       background-position: 0 0;
		    }
		    100% {
		       background-position: 50px 50px;
		    }
		}
		
		.nostripes > span > span, .nostripes > span:after {
			-webkit-animation: none;
			background-image: none;
		}
`;

export default (props: {wide?: string }) => {
	if (props.wide === "33") {
	return (
		<Progress>
			<div className="meter nostripes">
				<span className="percent33"></span>
			</div>
		</Progress>
	);
	}
	if (props.wide === "66") {
	return (
		<Progress>
			<div className="meter nostripes">
				<span className="percent66"></span>
			</div>
		</Progress>
	);
	}
	if (props.wide === "100") {
	return (
		<Progress>
			<div className="meter nostripes">
				<span className="percent100"></span>
			</div>
		</Progress>
	);
	} else {
	return (
		<Progress>
			<div className="meter nostripes">
				<span className="percent0"></span>
			</div>
		</Progress>
	);
	}
};