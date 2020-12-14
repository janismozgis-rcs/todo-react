import Todos from './components/Todos';
import AddNewTodo from './components/AddNewTodo';
import {useState} from 'react';

function App() {
  const [num, setNum] = useState(1);
  const reloadTodos = () => {
    setNum(num+1);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Todo list</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Todos num={num} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <AddNewTodo todoAdded={reloadTodos} />
        </div>
      </div>
    </div>
  );
}

export default App;
