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
    this.deleteTask = this.deleteTask.bind(this);
    this.markDone = this.markDone.bind(this);
    this.toggleVisibleTasks = this.toggleVisibleTasks.bind(this);
  }
  editTask (event){
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
  saveTask (){
    var array = this.state.tasks;
    array.unshift({message: this.state.messageHolder, importance: this.state.importanceHolder, done: false});
    this.setState({
      addingTask: false,
      messageHolder: '',
      importanceHolder: 'low',
      tasks: array
    });
  }
  deleteTask (i){
    var array = this.state.tasks;
    array.splice(i,1);
    this.setState({
      tasks: array
    });
  }
  markDone (i){
    var array = this.state.tasks;
    array[i].done = true;
    this.setState({
      tasks: array
    });
    console.log("Marked completed");
  }
  toggleVisibleTasks (){
    this.setState({
      doneTaskVisible: !this.state.doneTaskVisible
    });
  }
    render() {
      const task_list = this.state.tasks.map((item, i) => {
        return (<Task key = {i} index={i} message={item.message} importance={item.importance} handleDelete={this.deleteTask} handleDone={this.markDone} done={item.done}></Task>);
      });
      const new_task_list = (this.state.tasks.filter((item) => item.done == false)).map((item, i) => {
        return (<Task key = {i} index={i} message={item.message} importance={item.importance} handleDelete={this.deleteTask} handleDone={this.markDone} done={item.done}></Task>);
      });
      if (this.state.addingTask == false && this.state.doneTaskVisible == false){
        return (
          <div>
            <div>
              <h1>My to-do list</h1>
              <button onClick={this.toggleVisibleTasks}>Show completed</button>
              <button onClick={this.addTask}>+</button>
            </div>
            {new_task_list}
          </div>
        );
      }else if(this.state.addingTask == true && this.state.doneTaskVisible == false){
        return (
          <div>
            <CreateTask handleClose={this.closeTask} handleEdit={this.editTask} messageValue={this.state.messageHolder} handleImportance={this.editImportance} importanceValue={this.state.importanceHolder} handleSave={this.saveTask} />
            <div>
              <h1>My to-do list</h1>
              <button onClick={this.toggleVisibleTasks}>Show completed</button>
              <button onClick={this.addTask}>+</button>
            </div>
            {new_task_list}
          </div>
        );
      }else if(this.state.addingTask == true && this.state.doneTaskVisible == true){
        return (
          <div>
            <CreateTask handleClose={this.closeTask} handleEdit={this.editTask} messageValue={this.state.messageHolder} handleImportance={this.editImportance} handleSave={this.saveTask} />
            <div>
              <h1>My to-do list</h1>
              <button onClick={this.toggleVisibleTasks}>Hide completed</button>
              <button onClick={this.addTask}>+</button>
            </div>
            {task_list}
          </div>
        );
      }else{
        return (
          <div>
            <div>
              <h1>My to-do list</h1>
              <button onClick={this.toggleVisibleTasks}>Hide completed</button>
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
    this.delete = this.delete.bind(this);
    this.done = this.done.bind(this);
  }
  delete (){
    this.props.handleDelete(this.props.index);
    console.log('removing');
  }
  done (){
    this.props.handleDone(this.props.index);
  }
   render(){
     if (this.props.done == false){
     return (
       <div className="task">
         <span className = "new_task">{this.props.message}</span>
         <button onClick={this.delete}>delete</button>
         <button onClick={this.done}>done</button>
         <button className = {this.props.importance}>Importance</button>
       </div>
     );
   }else {
       return(
         <div className="task">
           <span className = "completed_task">{this.props.message}</span>
           <button onClick={this.delete}>delete</button>
           <button className = {this.props.importance}>Importance</button>
         </div>
       );
     }
   }
}
class CreateTask extends React.Component {
  constructor(props){
    super(props);
  }
  render (){
    if (this.props.importanceValue == 'low'){
    return(
      <div>
        <input type="text" onChange={this.props.handleEdit} value={this.props.messageValue} />
        <button value='low' onClick={this.props.handleImportance} className='active'>Low</button>
        <button value='medium'onClick={this.props.handleImportance}>Medium</button>
        <button value='high'onClick={this.props.handleImportance}>High</button>
        <button onClick={this.props.handleClose}>Close</button>
        <button onClick={this.props.handleSave}>Save</button>
      </div>
    );
  }else if(this.props.importanceValue == 'medium'){
   return(
    <div>
      <input type="text" onChange={this.props.handleEdit} value={this.props.messageValue} />
      <button value='low' onClick={this.props.handleImportance}>Low</button>
      <button value='medium'onClick={this.props.handleImportance} className='active'>Medium</button>
      <button value='high'onClick={this.props.handleImportance}>High</button>
      <button onClick={this.props.handleClose}>Close</button>
      <button onClick={this.props.handleSave}>Save</button>
    </div>
  );
  }else {
    return(
     <div>
       <input type="text" onChange={this.props.handleEdit} value={this.props.messageValue} />
       <button value='low' onClick={this.props.handleImportance}>Low</button>
       <button value='medium'onClick={this.props.handleImportance}>Medium</button>
       <button value='high'onClick={this.props.handleImportance} className='active'>High</button>
       <button onClick={this.props.handleClose}>Close</button>
       <button onClick={this.props.handleSave}>Save</button>
     </div>
   );
}
  }
}
module.exports = App;
