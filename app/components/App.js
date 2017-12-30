var React = require('react');


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addingTask: false,
      doneTaskVisible : false,
      importanceHolder: 'low',
      messageHolder: "",
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
  }
  closeTask (){
     this.setState({
       addingTask: false,
       messageHolder: "",
       importanceHolder: 'low'
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
  }
  toggleVisibleTasks (){
    this.setState({
      doneTaskVisible: !this.state.doneTaskVisible
    });
    console.log("importance in toggle task " + this.state.importanceHolder);
  }
  addTask (){
     this.setState({
       addingTask: true
     });
  }
    render() {
      const task_list = this.state.tasks.map((item, i) => {
        return (<Task key = {i} index={i} message={item.message} importance={item.importance} handleDelete={this.deleteTask} handleDone={this.markDone} done={item.done}></Task>);
      });
      const new_task_list = (this.state.tasks.filter((item) => item.done == false)).map((item, i) => {
        return (<Task key = {i} index={i} message={item.message} importance={item.importance} handleDelete={this.deleteTask} handleDone={this.markDone} done={item.done}></Task>);
      });
      const arr = this.state.tasks.filter((item) => item.done == false);
      const count = arr.length;
      if (this.state.addingTask == false && this.state.doneTaskVisible == false){
        return (
          <div className = "main_container">
            <h1>My to-do list</h1>
              <div className = "list_container">
                <div className = "head_container">
                  <div>{count} New</div>
                  <div><a onClick={this.toggleVisibleTasks}>Show completed</a></div>
                  <div><button onClick={this.addTask} className = "add_button">+</button></div>
                </div>
                <div className = "tasks_container">
                  {new_task_list}
                </div>
              </div>
          </div>
        );
      }else if(this.state.addingTask == true && this.state.doneTaskVisible == false){
        return (
          <div className = "main_container">
              <h1>My to-do list</h1>
              <div className = "list_container">
                <div className = "head_container">
                 <div>{count} New</div>
                 <div><a onClick={this.toggleVisibleTasks}>Show completed</a></div>
                 <div><button onClick={this.addTask} className = "add_button">+</button></div>
               </div>
              <CreateTask handleClose={this.closeTask} handleEdit={this.editTask} messageValue={this.state.messageHolder} handleImportance={this.editImportance} importanceValue={this.state.importanceHolder} handleSave={this.saveTask} />
            <div className = "tasks_container">
            {new_task_list}
          </div>
        </div>
      </div>
        );
      }else if(this.state.addingTask == true && this.state.doneTaskVisible == true){
        return (
          <div className = "main_container">
            <CreateTask handleClose={this.closeTask} handleEdit={this.editTask} messageValue={this.state.messageHolder} handleImportance={this.editImportance} importanceValue={this.state.importanceHolder} handleSave={this.saveTask} />
              <h1>My to-do list</h1>
              <div className = "list_container">
               <div className = "head_container">
               <div>{count} New</div>
               <div><a onClick={this.toggleVisibleTasks}>Hide completed</a></div>
               <div><button onClick={this.addTask} className = "add_button">+</button></div>
               </div>
            <div className = "tasks_container">
            {task_list}
          </div>
        </div>
      </div>
        );
      }else{
        return (
          <div className = "main_container">
              <h1>My to-do list</h1>
              <div className = "list_container">
               <div className = "head_container">
               <div>{count} New</div>
               <div><a onClick={this.toggleVisibleTasks}>Hide completed</a></div>
               <div><button onClick={this.addTask} className = "add_button">+</button></div>
            </div>
            <div className = "tasks_container">
            {task_list}
          </div>
          </div>
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
  }
  done (){
    this.props.handleDone(this.props.index);
  }
   render(){
     if (this.props.done == false){
     return (
       <div className="task">
         <div>
           <div className = {this.props.importance} />
         </div>
         <div>
           <span className = "new_task">{this.props.message}</span>
         </div>
         <div>
           <button className = "delete_task" onClick={this.delete}>delete</button>
         </div>
         <div>
           <button className = "mark_task" onClick={this.done}></button>
         </div>
       </div>
     );
   }else {
       return(
         <div className="completed_task">
           <div className = {this.props.importance}></div>
           <span className = "completed_task">{this.props.message}</span>
           <button onClick={this.delete}>delete</button>
         </div>
       );
     }
   }
}
class CreateTask extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
   document.getElementById("task-input").focus();
}
  render (){
    if (this.props.importanceValue == 'low'){
    return(
      <div class="new_task_form">
        <h2>New task</h2>
        <input type="text" id='task-input' onChange={this.props.handleEdit} value={this.props.messageValue} />
        <div>
          <span>Importance: </span>
          <button value='low' onClick={this.props.handleImportance} className='low selected' />
          <button value='medium'onClick={this.props.handleImportance} className = 'medium' />
          <button value='high'onClick={this.props.handleImportance} className = 'high' />
        </div>
        <div>
          <button className = 'neg_action' onClick={this.props.handleClose}>Cancel</button>
          <button className = 'pos_action' onClick={this.props.handleSave}>Save</button>
        </div>
      </div>
    );
  }else if(this.props.importanceValue == 'medium'){
   return(
     <div class="new_task_form">
       <h2>New task</h2>
       <input type="text" id='task-input' onChange={this.props.handleEdit} value={this.props.messageValue} />
       <div>
         <span>Importance: </span>
         <button value='low' onClick={this.props.handleImportance} className='low' />
         <button value='medium'onClick={this.props.handleImportance} className = 'medium selected' />
         <button value='high'onClick={this.props.handleImportance} className = 'high' />
       </div>
       <div>
         <button className = 'neg_action' onClick={this.props.handleClose}>Cancel</button>
         <button className = 'pos_action' onClick={this.props.handleSave}>Save</button>
       </div>
     </div>
  );
}else if (this.props.importanceValue == 'high'){
    return(
      <div class="new_task_form">
        <h2>New task</h2>
        <input type="text" id='task-input' onChange={this.props.handleEdit} value={this.props.messageValue} />
        <div>
          <span>Importance: </span>
          <button value='low' onClick={this.props.handleImportance} className='low' />
          <button value='medium'onClick={this.props.handleImportance} className = 'medium' />
          <button value='high'onClick={this.props.handleImportance} className = 'high selected' />
        </div>
        <div>
          <button className = 'neg_action' onClick={this.props.handleClose}>Cancel</button>
          <button className = 'pos_action' onClick={this.props.handleSave}>Save</button>
        </div>
      </div>
   );
}
  }
}
module.exports = App;
