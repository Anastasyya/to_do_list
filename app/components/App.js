var React = require('react');


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addingTask: false,
      doneTaskVisible : false,
      messageHolder: "",
      importanceHolder: 'low',
      tasks: [
        {
          message: 'create new task',
          importance: 'high',
          done: false
        },{
          message: 'create second task',
          importance: 'low',
          done: false
        }
      ]
    }
    this.editTask = this.editTask.bind(this);
    this.editImportance = this.editImportance.bind(this);
    this.addTask = this.addTask.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.closeTask = this.closeTask.bind(this);
  }
  editTask (event) {
    this.setState({
      messageHolder: event.target.value,
    });
  }
  editImportance (event){
    this.setState({
      importanceHolder: event.target.value,
    });
    console.log(this.state.importanceHolder);
  }
  addTask (){
     this.setState({
       addingTask: true
     });
  }
  closeTask (){
     this.setState({
       addingTask: false,
       messageHolder: ""
     });
  }
  saveTask () {
    var array = this.state.tasks;
    array.unshift({message: this.state.messageHolder, importance: this.state.importanceHolder, done: false});
    this.setState({
      addingTask: false,
      messageHolder: '',
      importanceHolder: 'low',
      tasks: array
    });
  }
    render() {
      const task_list = this.state.tasks.map((item, i) => {
        return <Task key = {i} index={i} message={item.message}></Task>
      });
      if (this.state.addingTask == false){
        return (
          <div>
            <div>
              <h1>My to-do list</h1>
              <button onClick={this.addTask}>+</button>
            </div>
            {task_list}
          </div>
        );
      }else{
        return (
          <div>
            <CreateTask handleClose={this.closeTask} handleEdit={this.editTask} messageValue={this.state.messageHolder} handleImportance={this.editImportance} handleSave={this.saveTask} />
            <div>
              <h1>My to-do list</h1>
              <button onClick={this.addTask}>+</button>
            </div>
            {task_list}
          </div>
        );
      }
    }
}
class Task extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      done: false
    }
  }
   render(){
     if (this.state.done == false){
     return (
       <div>
         {this.props.message}
         <button>delete</button>
         <button>done</button>
       </div>
     );
   }else {
       return(
         <div>
           <input type="text" />
         </div>
       );
     }
   }
}
class CreateTask extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      saved: false
    }
  }
  render (){
    return(
      <div>
        <input type="text" onChange={this.props.handleEdit} value={this.props.messageValue} />
        <button value='low' onClick={this.props.handleImportance}>Low</button>
        <button value='medium'onClick={this.props.handleImportance}>Medium</button>
        <button value='high'onClick={this.props.handleImportance}>High</button>
        <button onClick={this.props.handleClose}>Close</button>
        <button onClick={this.props.handleSave}>Save</button>
      </div>
    );
  }
}
module.exports = App;
