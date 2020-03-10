import React, { Component } from "react";

import "./Todo.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default class ToDo extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      name: "",
      image: ""
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.task.name,
      image: this.props.task.image
    });
  }

  handleEditSubmit = () => {
    let { name, image } = this.state;
    console.log(this.state);
    let { id } = this.props.task;
    this.props.editItem(id, {
      name,
      image
    });
    this.setState({
      edit: false
    });
  };

  render() {
    let { name, image } = this.state;
    let { id } = this.props.task;
    return (
      <div
        className={
          this.state.edit ? "todo-container todo-long" : "todo-container"
        }
      >
        {this.state.edit ? (
          <div>
            <input className="inputChange"
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Change item..."
              value={name}
            />
            <input className="inputChange"
              onChange={e => this.setState({ image: e.target.value })}
              placeholder="Change image..."
              value={image}
            />
            <button className="buttonSubmit" onClick={this.handleEditSubmit}>
              Submit
            </button>
          </div>
        ) : (
          <>
            <img
              className="todo-image"
              alt=" Error-204"
              src={this.props.task.image}
            />
            <p className="todo-text-name">{this.props.task.name} </p>
            <FontAwesomeIcon
              className="delete-icon"
              onClick={() => this.props.removeItem(this.props.task.id)}
              icon={faTimesCircle}
            />
            <button
              className="edit-btn"
              onClick={() => this.setState({ edit: true })}
            >
              Edit
            </button>
          </>
        )}
      </div>
    );
  }
}
