import React from 'react';
import { shallow } from 'enzyme';
import DoneList from '../../Todolist/DoneList';
import testUtil from '../../../utils/testUtil';

describe('DoneList组件', () => {
    it('初始渲染， doneList为空时， count为0', () => {
      const wrapper = shallow(<DoneList doneList={[]} />);
      const countEle = testUtil(wrapper, 'done-list-count');
      const doneItem = testUtil(wrapper, 'done-item');
      expect(countEle.text()).toBe("0");
      expect(doneItem.length).toBe(0);
    });

    it('列表项前面有个checkbox选择框, 且状态都是选中的状态', () => {
      const list = [
        { status: 'div',value: 1 },
        { status: 'input',value: 2 },
        { status: 'div',value: 3 }
      ];
      const wrapper = shallow(<DoneList doneList={list} />);
      const InputEle = testUtil(wrapper, 'done-item-checkbox');
      expect(InputEle.length).toBe(3);
      expect(InputEle.at(0).prop('checked')).toBeTruthy();
    });

   it('列表项执行changeTaskToDo事件，该选项移除列表', () => {
    const list = [
      { status: 'div',value: 1 },
      { status: 'div',value: 2 },
      { status: 'div',value: 3 }
    ];
    const fn = jest.fn();
    const wrapper = shallow(<DoneList doneList={list} changeTaskToDo={fn} />);
    const InputEle = testUtil(wrapper, 'done-item-checkbox');
    InputEle.at(1).simulate('change', {
      stopPropagation: () => {}
    });
    expect(fn).toHaveBeenLastCalledWith(1);
   });
    
});