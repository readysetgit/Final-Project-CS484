class Signup extends React.Component {
    render() {
      return (
        <div>
          Hello {this.props.name}
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Signup name="Taylor" />,
    document.getElementById('hello-example')
  );