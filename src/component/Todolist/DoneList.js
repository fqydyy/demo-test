import React from 'react';

class DoneList extends React.Component {

  render() {
    const { doneList, changeTaskToDo } = this.props;
    return (
      <div className="undo-list-container done-list-container">
        <div className="undo-list-title done-list-title">
          已完成列表
          <div className="undo-list-count done-list-count" data-test='done-list-count'>{doneList.length}</div> 
        </div>
        <ul className="undo-list-ul">
        {
          doneList.map((item, index) => {
            return <li 
              key={index} 
              data-test="done-item"
              className="undo-list-item"
              >
                <input 
                  type="checkbox" 
                  className="item-checkbox"
                  data-test="done-item-checkbox"
                  checked
                  onChange={(e) => {
                    e.stopPropagation();
                    changeTaskToDo(index)
                  }}
                 />{item.value}</li>
          })
        }
        </ul>

      </div>
    )
  }
}
export default DoneList;