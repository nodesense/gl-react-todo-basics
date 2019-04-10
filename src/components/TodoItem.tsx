import React from 'react';

import "./ToDoItem.css";

// local state
export interface Todo {
    title: string;
    completed: boolean;
}

// props means parent to child
interface TodoItemProps {
    // one todo item object passed as props to TodoItem component
    // mandatory
    todo: Todo;
    toggleToDo: any; // Function
}



// for component own state
interface TodoItemState {
     
}

// no state in this component
export class TodoItem extends React.Component<TodoItemProps,TodoItemState>  {

   
    // called when the checkbox value changed
    handleChange = (e: any) => {
        //alert('handle change ' + e.target.checked);
        // this component get todo item as props
        // props are read only, data should not be changed 
        // in child component as it is props
        // if data to be changed, call the parent function

        // calling parent function
        this.props.toggleToDo(this.props.todo);

    }

    render() {
        return (
            <div className="todo">
                <label>
                <input type="checkbox"
                        checked={this.props.todo.completed}
                        onChange={this.handleChange}
                />
                <span className="toggle button">{this.props.todo.title}</span>
                </label>
              
            </div>
        )
    }
}