import React from "react";
import renderer from "react-test-renderer";
import MatchMedia from "../src/index.js";

const mock = matches => () => ({
	addListener: () => {},
	removeListener: () => {},
	matches
});
it("renders correctly with react children", () => {
	window.matchMedia = mock(true);
	const tree = renderer
		.create(
			<MatchMedia query={"(min-width: 900px)"}>
				<div>iamhere</div>
			</MatchMedia>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it("renders correctly with function", () => {
	window.matchMedia = mock(true);
	const tree = renderer.create(
		<MatchMedia query={"(min-width: 900px)"}>
			{({ matches }) => {
				if (matches) {
					return <div>nowhere</div>;
				}
				return null;
			}}
		</MatchMedia>
	);
	expect(tree).toMatchSnapshot();
});

it("not render when media query not match", () => {
	window.matchMedia = mock(false);
	const tree = renderer
		.create(
			<MatchMedia query={"(min-width: 900px)"}>
				<div>iamhere</div>
			</MatchMedia>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});

it("not render when media query not match(function)", () => {
	window.matchMedia = mock(false);
	const tree = renderer
		.create(
			<MatchMedia query={"(min-width: 900px)"}>
				{({ matches }) => {
					if (matches) {
						return <div>nowhere</div>;
					}
					return null;
				}}
			</MatchMedia>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
