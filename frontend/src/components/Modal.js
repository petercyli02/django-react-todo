import React, { Component } from "react";


export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = {
            ...this.state.activeItem, [name]: value
        };

        this.setState({ activeItem });
    }

    render() {
        const { toggle, onSave } = this.props;

        return (
            <div>
                <div>
                    <div>
                        <h5>To-do Item</h5>
                        <button onClick={toggle}>&times;</button>
                    </div>
                    <div>
                        <form>
                            <div>
                                <label htmlFor="todo-title">Title</label>
                                <input
                                    type="text"
                                    id="todo-title"
                                    name="title"
                                    value={this.state.activeItem.title}
                                    onChange={this.handleChange}
                                    placeholder="Enter Todo Title"
                                />                                   
                            </div>
                            <div>
                                <label htmlFor="todo-description">Title</label>
                                <input
                                    type="text"
                                    id="todo-description"
                                    name="description"
                                    value={this.state.activeItem.description}
                                    onChange={this.handleChange}
                                    placeholder="Enter Todo description"
                                />                                   
                            </div>
                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="completed"
                                        checked={this.state.activeItem.completed}
                                        onChange={this.handleChange}
                                    />
                                    Completed
                                </label>                                                             
                            </div>
                        </form>
                    </div>
                    <div>
                        <button onClick={() => onSave(this.state.activeItem)}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

  

