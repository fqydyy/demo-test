import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  handleInputChange = (e) => {
    this.setState({
      value: e.target && e.target.value
    })
  }
  handleInputKeyUp = (e) => {
    const { value } = this.state;
    if (e.keyCode === 13 && value) {
      this.props.addUndoItem && this.props.addUndoItem(value);
      this.setState({
        value: ''
      });
    }
  }
  render() {
    const { value } = this.state;
    return (
      <div className="header">
        <div className="header-content">
          <label>ToDoList</label>
          <input 
            data-test='input'
            className="header-input" 
            value={value}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp} 
          />
        </div>
      </div>
    )
  }
}
export default Header;