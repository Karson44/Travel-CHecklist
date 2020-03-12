import React, { Component } from "react";
import reset from "./reset.css";
import Header from "./Components/Header";
import "./App.css";
import Todo from "./Components/Todo";
import axios from "axios";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
      inputName: "",
      inputImage: ""
    };
  }

  componentDidMount() {
    axios.get("/api/items").then(res => {
      this.setState({
        list: res.data
      })
      .catch(() => {
        console.log('Error')
      })
    });
  }

  handleInputChangeName = value => {
    this.setState({ inputName: value });
  };
  handleInputChangeImg = value => {
    this.setState({ inputImage: value });
  };

  handleAddTask = () => {
    axios
      .post("/api/items", {
        name: this.state.inputName,
        image: this.state.inputImage
      })
      .then(res => {
        console.log("HERE");
        this.setState({
          list: res.data,
          inputName: "",
          inputImage: ""
        });
      });
  };

  editItem = (id, obj) => {
    console.log("making changes to the worlds");
    axios.put(`/api/items/${id}`, { obj }).then(res => {
      this.setState({
        list: res.data
      });
      console.log(this.state.list);
    });
  };

  removeItem = id => {
    axios.delete(`/api/delete/${id}`).then(res => {
      this.setState({
        list: res.data
      });
    });
  };

  render() {
    let list = this.state.list.map((element, index) => {
      return (
        <Todo
          editItem={this.editItem}
          removeItem={this.removeItem}
          key={index}
          task={element}
        />
      );
    });
    return (
      <div>
        <Header />
        <div className="header"></div>
        <div className="App">
          <div className="quad">
            <div className="box">
              <div className="title">Remember to Bring</div>
              <input
                type="text"
                placeholder="Add Item"
                value={this.state.inputName}
                placeholder="Enter an item..."
                onChange={e => this.handleInputChangeName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Add Item"
                value={this.state.inputImage}
                placeholder="Enter an image..."
                onChange={e => this.handleInputChangeImg(e.target.value)}
              />
              <button onClick={this.handleAddTask} className="addButton">
                Add
              </button>
              <br />
              <div className="listDisplay">{list}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
