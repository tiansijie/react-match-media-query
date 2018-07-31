import React from "react";
export default class MatchMedia extends React.Component {
	constructor() {
		super();
		this.state = {
			shouldDisplay: true
		};
		this.handleMediaChange = this.handleMediaChange.bind(this);
	}

	handleMediaChange(mql) {
		this.setState({ shouldDisplay: mql.matches });
	}

	componentDidMount() {
		this.mediaQueryList =
			window && window.matchMedia && window.matchMedia(this.props.query);
		if (this.mediaQueryList) {
			this.mediaQueryList.addListener(this.handleMediaChange);
			//Call once to initalized
			this.handleMediaChange(this.mediaQueryList);
		}
	}

	componentWillUnmount() {
		if (this.mediaQueryList) {
			this.mediaQueryList.removeListener(this.handleMediaChange);
		}
	}

	render() {
		if (typeof this.props.children === "function") {
			return this.props.children({ matches: this.state.shouldDisplay });
		} else {
			return this.state.shouldDisplay ? this.props.children : null;
		}
	}
}
