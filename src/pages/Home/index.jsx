import { Component } from "react";
import Greeting from "../../components/Home/Greeting";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Greeting name="Deshan(Called From Prop)"/>
      </div>
    );
  }
}

export default HomePage;
