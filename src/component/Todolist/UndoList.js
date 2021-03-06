import React from 'react';

class UndoList extends React.Component {

  render() {
    const { 
      list, deleteItem, changeStatus, changeValue, handleInputBlur, changeTaskToDone
    } = this.props;
    return (
      <div className="undo-list-container">
        <div className="undo-list-title">
          未完成列表
          <div className="undo-list-count" data-test='count'>{list.length}</div> 
        </div>
        
        <ul className="undo-list-ul">
          {
            list.map((item, index) => {
              return <li 
                className="undo-list-item"
                key={index}
                data-test="undo-item"
                onClick={() => changeStatus(index)}
                >
                <input 
                  type="checkbox" 
                  data-test="undo-item-checkbox"
                  className="item-checkbox"
                  checked={false}
                  onChange={(e) => {
                    e.stopPropagation();
                    changeTaskToDone(index);
                  }}
                 />
                {
                  item.status === 'div' ? item.value : 
                  <input 
                   data-test="item-input"
                   className="item-input"
                   value={item.value}
                   onChange={(e) => {
                    changeValue(index, e.target.value);
                   }}
                   onBlur={() => {
                    handleInputBlur(index)
                   }}
                  />
                }
                <div 
                  className="undo-list-item-delete"
                  data-test="delete-item" 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(index)
                  }}
                >-</div>
                </li>
            })
          }
        </ul>
      </div>
    )
  }
}
export default UndoList;