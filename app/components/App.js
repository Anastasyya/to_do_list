var React = require('react');


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addingTask: false,
      doneTaskVisible : false,
      importanceHolder: 'low',
      messageHolder: "",
      completedCount: 0,
      tasks: [
        {
          message: 'create new task',
          importance: 'high',
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
  componentDidMount(){
    if(localStorage.getItem('localTasks')){
      var savedTasks = JSON.parse(localStorage.getItem('localTasks'));
      this.setState({
        tasks: savedTasks
      });
    }
    if(localStorage.getItem('doneTasks')){
      var doneTasks = JSON.parse(localStorage.getItem('doneTasks'));
      this.setState({
        completedCount: doneTasks
      });
    }
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
    localStorage.setItem('localTasks', JSON.stringify(this.state.tasks));
  }
  deleteTask (i){
    var array = this.state.tasks;
    if (array[i].done == true){
      this.setState((prevState) => {
        localStorage.setItem('doneTasks', JSON.stringify(prevState.completedCount - 1));
        return {completedCount: prevState.completedCount - 1};
      });}
    array.splice(i,1);
    this.setState({
      tasks: array
    });
    localStorage.setItem('localTasks', JSON.stringify(this.state.tasks));
  }
  markDone (i){
    var array = this.state.tasks;
    array[i].done = true;
    this.setState((prevState) => {
      localStorage.setItem('doneTasks', JSON.stringify(prevState.completedCount + 1));
      return {tasks: array,
      completedCount: prevState.completedCount + 1};
    });
  }
  toggleVisibleTasks (){
    this.setState({
      doneTaskVisible: !this.state.doneTaskVisible
    });
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
      var count = arr.length;
      if (this.state.completedCount > 0 && this.state.doneTaskVisible == false){
        return (
          <div className = "main_container">
            <h1>My to-do list</h1>
              <div className = "list_container">
                <div className = "head_container">
                  <div>{count} New</div>
                  <div><a onClick={this.toggleVisibleTasks}>Show completed</a></div>
                  <div><button onClick={this.addTask} className = "add_button">+</button></div>
                </div>
                <CreateTask visibility ={this.state.addingTask} handleClose={this.closeTask} handleEdit={this.editTask} messageValue={this.state.messageHolder} handleImportance={this.editImportance} importanceValue={this.state.importanceHolder} handleSave={this.saveTask} />
                <div className = "tasks_container">
                  {new_task_list}
                </div>
              </div>
          </div>
        );
      }else if(this.state.completedCount > 0 && this.state.doneTaskVisible == true){
        return (
          <div className = "main_container">
              <h1>My to-do list</h1>
              <div className = "list_container">
               <div className = "head_container">
               <div>{count} New</div>
               <div><a onClick={this.toggleVisibleTasks}>Hide completed</a></div>
               <div><button onClick={this.addTask} className = "add_button">+</button></div>
               </div>
               <CreateTask visibility ={this.state.addingTask} handleClose={this.closeTask} handleEdit={this.editTask} messageValue={this.state.messageHolder} handleImportance={this.editImportance} importanceValue={this.state.importanceHolder} handleSave={this.saveTask} />
            <div className = "tasks_container">
            {task_list}
          </div>
        </div>
      </div>
        );
       }
      else if(this.state.completedCount == 0){
        return (
          <div className = "main_container">
              <h1>My to-do list</h1>
              <div className = "list_container">
               <div className = "head_container">
               <div>{count} New</div>
               <div></div>
               <div><button onClick={this.addTask} className = "add_button">+</button></div>
               </div>
               <CreateTask visibility ={this.state.addingTask} handleClose={this.closeTask} handleEdit={this.editTask} messageValue={this.state.messageHolder} handleImportance={this.editImportance} importanceValue={this.state.importanceHolder} handleSave={this.saveTask} />
            <div className = "tasks_container">
            {new_task_list}
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
           <a href="#" className = "delete_task" onClick={this.delete}></a>
         </div>
         <div>
           <button className = "mark_task" onClick={this.done}></button>
         </div>
       </div>
     );
   }else {
     return (
       <div className="task">
         <div>
           <div className = {this.props.importance} />
         </div>
         <div>
           <span className = "completed_task">{this.props.message}</span>
         </div>
         <div>
           <a href="#" className = "delete_task" onClick={this.delete}></a>
         </div>
         <div>
         </div>
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
    if (this.props.visibility == true){
   document.getElementById("task-input").focus();
  }
}
  render (){
    if (this.props.visibility == true){
    return(
      <div className="new_task_form">
        <h2>New task</h2>
        <input type="text" id='task-input' onChange={this.props.handleEdit} value={this.props.messageValue} />
        <ChooseImportance importanceSelection = {this.props.importanceValue} selectImportance ={this.props.handleImportance}/>
        <div>
          <button className = 'neg_action' onClick={this.props.handleClose}>Cancel</button>
          <button className = 'pos_action' onClick={this.props.handleSave}>Save</button>
        </div>
      </div>
    );
  }else{
    return(
      <div></div>
    );
  }
  }
}
class ChooseImportance extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    if (this.props.importanceSelection == 'low'){
    return (
      <div value={this.props.messageValue}>
        <span>Importance: </span>
        <button value='low' onClick={this.props.selectImportance} className='low selected' />
        <button value='medium'onClick={this.props.selectImportance} className = 'medium' />
        <button value='high'onClick={this.props.selectImportance} className = 'high' />
      </div>);
    }else if(this.props.importanceSelection == 'medium'){
      return(
        <div value={this.props.messageValue}>
          <span>Importance: </span>
          <button value='low' onClick={this.props.selectImportance} className='low' />
          <button value='medium'onClick={this.props.selectImportance} className = 'medium selected' />
          <button value='high'onClick={this.props.selectImportance} className = 'high' />
        </div>
      );
    }else if(this.props.importanceSelection == 'high'){
      return(
        <div value={this.props.messageValue}>
          <span>Importance: </span>
          <button value='low' onClick={this.props.selectImportance} className='low' />
          <button value='medium'onClick={this.props.selectImportance} className = 'medium' />
          <button value='high'onClick={this.props.selectImportance} className = 'high selected' />
        </div>
      );
    }
  }
}
module.exports = App;
