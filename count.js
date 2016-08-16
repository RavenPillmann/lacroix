var CounterBox = React.createClass({
	render: function() {
		return (
			<div className="counterBox">
			hello
			</div>
		);
	}
});

ReactDOM.render(
	<CounterBox />,
	document.getElementById('content')
);