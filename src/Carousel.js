import { createRef, Component } from "react";
import Flicking, { FlickingError } from "@egjs/react-flicking";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.flicking = createRef();
    this.panels = [0, 1, 2];
  }
  render() {
    return <Flicking ref={this.flicking}>
      { this.panels.map(idx => <div className="panel" key={idx}>{idx}</div>) }
    </Flicking>;
  }
  async moveToNextPanel() {
    try {
      await this.flicking.next();
    } catch (e) {
      console.log(e instanceof FlickingError); // true
      console.log(e.code);
    }
  }
}