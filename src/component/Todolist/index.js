import React from 'react';
import Header from './Header';
import UndoList from './UndoList';
import './style.css';


class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      undoList: []
    }
  }
  addUndoItem = (value) => {
    this.setState({
      undoList: [...this.state.undoList, {
        status: 'div',
        value
      }]
    })
  }
  deleteItem = (index) => {
    const newList = [...this.state.undoList];
    newList.splice(index, 1);
    this.setState({
      undoList: newList
    })
    
  }
  changeStatus = (index) => {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (listIndex === index) {
        return {
          ...item,
          status: 'input'
        }
      }
      return {
        ...item,
        status: 'div'
      }
    });
    this.setState({
      undoList: newList
    })
  } 
  handleInputBlur = (index) => {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (listIndex === index) {
        console.log('listItem---', item);

        return {
          ...item,
          status: 'div'
        }
      }
      return item
    });
    this.setState({
      undoList: newList
    })
  }
  changeValue = (index, value) => {
    const newList = this.state.undoList.map((item, listIndex) => {
      if (listIndex === index) {
        return {
          ...item,
          value
        }
      }
      return item
    });
    this.setState({
      undoList: newList
    })
  }
  render() {
    const { undoList } = this.state;
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList 
          list={undoList} 
          deleteItem={this.deleteItem}
          changeStatus={this.changeStatus}
          changeValue={this.changeValue}
          handleInputBlur={this.handleInputBlur}
        />
      </div>
    )
  }
}
export default TodoList;