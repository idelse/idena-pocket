import * as React from "react";
import styled from "styled-components";
import { colors } from "../helpers";
import { Link } from "react-router-dom";

const Button = styled.span`
	.fa {
	color: ${colors.white}; 
	float: right;
	padding: 3px 0px;
    margin-left: 1em;
	}
	.btn {
		background: ${colors.black};
		border-radius: 4px;
		padding: .85em;
		box-sizing: border-box;
		cursor: pointer;
		display: block;
		text-align: center;
		color: ${colors.white};
		text-decoration: none;
		font-weight: normal;
		font-size: 1.1em;
		-webkit-transition: all .35s ease;
    	-o-transition: all .35s ease;
    	transition: all .35s ease;
    	-webkit-box-shadow: 0 1px 3px rgba(0,0,0,.2);
    	box-shadow: 0 1px 3px rgba(0,0,0,.2);
	    @media (min-width: 300px) {
		    width: 100%;
		}
	    @media (min-width: 768px) {
		    width: 300px;
		}
	}
	.btn:hover {
		background: ${colors.darkBlack};
    	-webkit-box-shadow: 0 2px 12px rgba(0,0,0,.2);
    	box-shadow: 0 2px 12px rgba(0,0,0,.2);
	}
	.btn:focus {
		background: ${colors.black};
    	-webkit-box-shadow: 0 2px 12px rgba(0,0,0,.2);
    	box-shadow: 0 2px 12px rgba(0,0,0,.2);
	}
	.btn--disabled, .btn--disabled:hover {
		background: ${colors.darkGrey};
	}
	.centermargin {
		margin: auto;
	}
`;

export default (props: { onClick?: any, type?: string, to?: string, disabled?: boolean, text: string, margin?: string, icon?: string }) => {
	const { disabled, text, to, type, ...rest } = props;
	if (props.disabled) {
		if (props.margin === "center") {
		return (
			<Button>
				<div className="btn btn--disabled centermargin" {...removeEventListener}>
				{text}
				{<i className={`fa fa-${props.icon}`}/>}
				</div>
			</Button>
		);
		} else {
		return (
			<Button>
				<div className="btn btn--disabled" {...removeEventListener}>
				{text}
				{<i className={`fa fa-${props.icon}`}/>}
				</div>
			</Button>
		);
		}
	}
	if (to) {
		if (props.margin === "center") { 
		return (
			<Button>
				<Link className="btn centermargin" to={to} {...rest}>
				{text}
				{<i className={`fa fa-${props.icon}`}/>}
				</Link>
			</Button>
		);
		} else {
		return (
			<Button>
				<Link className="btn" to={to} {...rest}>
				{text}
				{<i className={`fa fa-${props.icon}`}/>}
				</Link>
			</Button>
		);
		}
	}
	if (type === "submit") {
		if (props.margin === "center") { 
		return (
			<Button>
				<input className="btn centermargin" type="submit" {...rest} value={text} />
			</Button>
		);
		} else {
		return (
			<Button>
				<input className="btn" type="submit" {...rest} value={text} />
			</Button>
		);
		}
	}
	if (props.margin === "center") {
	return (
		<Button>
			<div className="btn centermargin">
			{text}
			{<i className={`fa fa-${props.icon}`}/>}
			</div>
		</Button>
	);
	} else {
	return (
		<Button>
			<div className="btn">
			{text}
			{<i className={`fa fa-${props.icon}`}/>}
			</div>
		</Button>
	);
	}
};
