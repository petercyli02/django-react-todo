import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import Cookies from "js-cookie";


var csrftoken = Cookies.get('csrftoken');

// const todoItems = [
//   {
//     id: 1,
//     title: "Go to Market",
//     description: "Buy ingredients to prepare dinner",
//     completed: true,
//   },
//   {
//     id: 2,
//     title: "Study",
//     description: "Read Algebra and History textbook for the upcoming test",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Sammy's books",
//     description: "Go to library to return Sammy's books",
//     completed: true,
//   },
//   {
//     id: 4,
//     title: "Article",
//     description: "Write article on how to use Django with React",
//     completed: false,
//   },
// ];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      },
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/todo/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/todo/${item.id}/`, item, {
          headers: {
            'X-CSRFToken': csrftoken
          }
        })
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("/api/todo/", item, {
        headers: {
          'X-CSRFToken': csrftoken
        }
      })
      .then((res) => this.refreshList());
  }

  handleDelete = (item) => {
    axios
      .delete(`/api/todo/${item.id}/`, {
        headers: {
          'X-CSRFToken': csrftoken
        }
      })
      .then((res) => this.refreshList())
  };

  createItem = () => {
    const item = {
      title: "",
      description: "",
      completed: false,
    }
    this.setState({
      activeItem: item,
      modal: !this.state.modal,
    })
  }

  editItem = (item) => {
    this.setState({
      activeItem: item, 
      modal: !this.state.modal
    });
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true});
    }

    return this.setState({ viewCompleted: false });
  }

  renderTabList = () => {
    return (
      <div className='nav'>
        <span 
          className={this.state.viewCompleted ? "font-bold" : "" }
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? "" : "font-bold"}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    )
  }

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );
    console.log("viewCompleted: " + viewCompleted)
    console.log("this.state.todoList:\n\n" + JSON.stringify(this.state.todoList));
    console.log("\n\nnewItems:\n\n" + JSON.stringify(newItems));
    return newItems.map((item) => {
      return (
        <li
          key={item.id}
        >
          <span
            className={`todo-title ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.description}
          >
            {item.title}         
          </span>
          <span>
            <button
              onClick={() => this.editItem(item)}
            >
              Edit
            </button>
            <button
              onClick={() => this.handleDelete(item)}
            >
              Delete
            </button>
          </span>
        </li> 
      )
    });
  }

  render() {
    return (
      <main>
        <h1>Todo App</h1>
        <div>
          <div>
            <div>
              <div>
                <button
                  onClick={this.createItem}
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {
          this.state.modal ? (
            <Modal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null
        }
      </main>
    )
  }
}


export default App;