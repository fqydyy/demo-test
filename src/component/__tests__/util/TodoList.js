import React from 'react';
import { shallow } from 'enzyme';
import Todolist from '../../Todolist';
import UndoList from '../../Todolist/UndoList';
import { exec } from 'child_process';

describe('TodoList组件', () => {
  it('存在一个undoList, 初始值为空', () => {
    const wrapper = shallow(<Todolist />);
    expect(wrapper.state('undoList')).toEqual([]);
  });

  it('存在一个addUndoItem事件, 传递给Header组件', () => {
    const wrapper = shallow(<Todolist />);
    const header = wrapper.find('Header'); // 这样可或得Header组件
    expect(header.prop('addUndoItem')).toBeTruthy();
  });

  it('当Header 回车时，undoList应该新增内容', () => { //组件解耦，可根据事件调用来测试
    const wrapper = shallow(<Todolist />);
    const header = wrapper.find('Header');
    const addFunc = header.prop('addUndoItem');
    const value = "测试事件"
    addFunc(value)
    expect(wrapper.state('undoList').length).toBe(1);
    expect(wrapper.state('undoList')[0]).toEqual({
      status: 'div',
      value
    });
  });

  it('UndoList组件应该传递list和deleteItem, changeStatus, changeValue, handleInputBlur, changeTaskToDone参数', () => {
    const wrapper = shallow(<Todolist />);
    const undoList = wrapper.find(UndoList);
    expect(undoList.prop('list')).toBeTruthy();
    expect(undoList.prop('deleteItem')).toBeTruthy();
    expect(undoList.prop('changeStatus')).toBeTruthy();
    expect(undoList.prop('changeValue')).toBeTruthy();
    expect(undoList.prop('handleInputBlur')).toBeTruthy();
    expect(undoList.prop('changeTaskToDone')).toBeTruthy();
  });

  it('deleteItem 调用，list的内容应该减少', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'div',value: 2 },
      { status: 'div',value: 3 }
    ];
    const wrapper = shallow(<Todolist />);
    wrapper.setState({
      undoList: list
    });
    const { deleteItem } = wrapper.instance();
    deleteItem(1);
    expect(wrapper.state('undoList')).toEqual( [list[0], list[2]]);
  });

  it('changeStatus 调用，list的对应选项状态改变', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'div',value: 2 },
      { status: 'div',value: 3 }
    ];
    const wrapper = shallow(<Todolist />);
    wrapper.setState({
      undoList: list
    });
    const { changeStatus } = wrapper.instance();
    changeStatus(1);
    expect(wrapper.state('undoList')).toEqual( [list[0], {
      status: 'input',
      value: 2
    }, list[2]]);
  });

  it('changeValue 调用，list的对应选项状态改变', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'input',value: 2 },
      { status: 'div',value: 3 }
    ];
    const value = 'test';
    const wrapper = shallow(<Todolist />);
    wrapper.setState({
      undoList: list
    });
    const { changeValue } = wrapper.instance();
    changeValue(1, value);
    expect(wrapper.state('undoList')).toEqual( [list[0], {
      status: 'input',
      value: value
    }, list[2]]);
  });

  it('handleInputBlur 调用，list的对应选项状态改变', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'input',value: 2 },
      { status: 'div',value: 3 }
    ];
    const wrapper = shallow(<Todolist />);
    wrapper.setState({
      undoList: list
    });
    const { handleInputBlur } = wrapper.instance();
    handleInputBlur(1);
    expect(wrapper.state('undoList')).toEqual( [list[0], {
      status: 'div',
      value: 2
    }, list[2]]);
  });
 
  it('给DoneList组件传递一个donelist的参数, 初始值为空, 还需要传递changeTaskToDo事件', () => {
    const wrapper = shallow(<Todolist />);
    const doneListComp = wrapper.find('DoneList');
    expect(doneListComp.prop('doneList')).toBeTruthy();
    expect(wrapper.state('doneList')).toEqual([]);
    expect(doneListComp.prop('changeTaskToDo')).toBeTruthy();
  });

  it('changeTaskToDone触发时, 任务从未完成列表移除，添加到已完成列表中', () => {
    const undoList = [
      { status: 'div', value: 111 },
      { status: 'div', value: 222 },
      { status: 'div', value: 333 }
    ]
    const doneList = [];
    const wrapper = shallow(<Todolist />);
    wrapper.setState({
      undoList,
      doneList
    })
    const { changeTaskToDone } = wrapper.instance();
    changeTaskToDone(1);
    expect(wrapper.state('undoList').length).toBe(2);
    expect(wrapper.state('undoList')).toEqual([undoList[0], undoList[2]]);
    expect(wrapper.state('doneList').length).toBe(1);
    expect(wrapper.state('doneList')).toEqual([undoList[1]]);
  });

  it('changeTaskToDo触发时, 任务从已完成列表移除，添加到未完成列表中', () => {
    const undoList = [
      { status: 'div', value: 222 }
    ]
    const doneList = [
      { status: 'div', value: 111 },
      { status: 'div', value: 333 }
    ];
    const wrapper = shallow(<Todolist />);
    wrapper.setState({
      undoList,
      doneList
    })
    const { changeTaskToDo } = wrapper.instance();
    changeTaskToDo(1);
    expect(wrapper.state('undoList').length).toBe(2);
    expect(wrapper.state('undoList')).toEqual([undoList[0], doneList[1]]);
    expect(wrapper.state('doneList').length).toBe(1);
    expect(wrapper.state('doneList')).toEqual([doneList[0]]);
  });
});









