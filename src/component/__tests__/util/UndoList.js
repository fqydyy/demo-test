import React from 'react';
import { shallow } from 'enzyme';
import UndoList from '../../Todolist/UndoList';
import testUtil from '../../../utils/testUtil';

describe('UndoList组件', () => {

  it('初始渲染， list为空时， count为0', () => {
    const wrapper = shallow(<UndoList list={[]} />);
    const countEle = testUtil(wrapper, 'count');
    const undoItem = testUtil(wrapper, 'undo-item');
    expect(countEle.text()).toBe("0");
    expect(undoItem.length).toBe(0);
  });

  it('有内容时， list不为空时， count等于list的长度', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'div',value: 2 },
      { status: 'div',value: 3 }
    ]
    const wrapper = shallow(<UndoList list={list} />);
    const countEle = testUtil(wrapper, 'count');
    const undoItem = testUtil(wrapper, 'undo-item');
    expect(countEle.text()).toBe("3");
    expect(undoItem.length).toBe(3);
  });

  it('列表项undo-item上面有删除按钮', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'div',value: 2 },
      { status: 'div',value: 3 }
    ]
    const wrapper = shallow(<UndoList list={list} />);
    const deleteItem = testUtil(wrapper, 'delete-item');
    expect(deleteItem.length).toBe(3);
  });

  it('列表项undo-item执行删除操作', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'div',value: 2 },
      { status: 'div',value: 3 }
    ]
    const fn = jest.fn();
    const wrapper = shallow(<UndoList deleteItem={fn} list={list} />);
    const deleteItem = testUtil(wrapper, 'delete-item');
    deleteItem.at(1).simulate('click', {
      stopPropagation: () => {}
    });
    expect(fn).toHaveBeenLastCalledWith(1);
  });
  
  it('列表项undo-item被点击时， 执行changeStatus操作', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'div',value: 2 },
      { status: 'div',value: 3 }
    ]
    const fn = jest.fn();
    const wrapper = shallow(<UndoList changeStatus={fn} list={list} />);
    const undoItem = testUtil(wrapper, 'undo-item');
    undoItem.at(1).simulate('click');
    expect(fn).toHaveBeenLastCalledWith(1);
  });
  
  it('列表项状态是input时，展示输入框', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'input',value: 2 },
      { status: 'div',value: 3 }
    ];
    const wrapper = shallow(<UndoList list={list} />);
    const InputEle = testUtil(wrapper, 'item-input');
    expect(InputEle.length).toBe(1);
  });

  it('列表项状态是input时，输入变化时，触发changeValue事件', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'input',value: 2 },
      { status: 'div',value: 3 }
    ];
    const fn = jest.fn();
    const value = '测试改变值';
    const wrapper = shallow(<UndoList list={list} changeValue={fn}/>);
    const InputEle = testUtil(wrapper, 'item-input');
    InputEle.simulate('change', {
      target: {value: value}
    });
    expect(fn).toHaveBeenLastCalledWith(1, value);
  });

  it('列表项状态是input时，失焦时，触发handleInputBlur事件', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'input',value: 2 },
      { status: 'div',value: 3 }
    ];
    const fn = jest.fn();
    const wrapper = shallow(<UndoList list={list} handleInputBlur={fn}/>);
    const InputEle = testUtil(wrapper, 'item-input');
    InputEle.simulate('blur');
    expect(fn).toHaveBeenLastCalledWith(1);
  });
});










