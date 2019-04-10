import React from 'react';

// props means parent to child
interface TodoListProps {
}

// local state
export interface Todo {
    title: string;
    completed: boolean;
}

// for component own state
interface TodoListState {
    todos: Todo[];
    newTitle: string;
    error: string;
}

import {TodoItem} from './TodoItem';

export class TodoList extends React.Component<TodoListProps,TodoListState>  {
    constructor(props: TodoListProps) {
        super(props);

        // data is in TodoList component state
        // to change the data, only TodoList component can do
        this.state = {
            // data in local state
            todos: [
                {
                    title: 'Learn JS Basics Today',
                    completed: true
                },
                {
                    title: 'Learn Array in JavaScript',
                    completed: true
                },{
                    title: 'Learn Something Today',
                    completed: false
                },
            ],

            // provide an input box, that display new todo item
            // click add button to add new todo.
            newTitle: '',
            error: ''
        }
    }

     // to be invoked by child component ie TodoItem 
    // when the checkbox toggled
    // child to parent communication, callback
    // pass this function as props to child component
    toggleToDo = (todo: Todo) => {
        // alert('in Parent component ' + todo.title);

        const newList = this.state.todos.map ( todoItem => {
            // find the item in array
            // toggle the completed 
            if (todo.title == todoItem.title) {
                // mutation, is bad.
                // false to true, true to false
                todoItem.completed = !todo.completed;
                return todoItem;

                // immutable, good part
                // return {...todoItem, completed: !todo.completed}
            }

            return todoItem;
        })

        // calls the render method
        // pass the props again to child component
        // checkbox will be toggled automatically
        this.setState({
            todos: newList
        })
    }

    onTitleChange = (e: any) => {

        console.log('Is valid ', e.target.checkValidity());

        if (e.target.checkValidity()) { // true means no error
            // if error, then display the error msg
            this.setState({
                error: ''
            })
        } else {
            this.setState({
                error: 'Error in Title'
            })
        }

        this.setState({
            newTitle: e.target.value
        })
    }

    onAdd = () => {
         const todo : Todo = {
             title: this.state.newTitle,
             completed: false
         }

         // clone the array, add the new item at the end of the cloned array
         const todos = [...this.state.todos, todo]
         this.setState({
             todos: todos,
             newTitle: ''
         })

    }

    render() {
        return (
            <div>
                <h2>ToDo List</h2>

                <input name="title"
                       value={this.state.newTitle}
                       onChange={this.onTitleChange}

                       required
                       minLength={5}
                />

                 
                <p> {this.state.error} </p>
                

                <button onClick={this.onAdd}>Add</button>
                {/*  
                    we have more items, 
                    we use map method to iterate each elements in array
                */}

                {/* below code generate TodoItem component
                   for each entry in array 3 instance of todoItem */}
                     
                <form>
                 {
                     this.state.todos.map(todoItem => (
                         <TodoItem todo={todoItem}
                                   toggleToDo={this.toggleToDo}
                         />
                     ))
                 }
                 </form>

            </div>
        )
    }
}