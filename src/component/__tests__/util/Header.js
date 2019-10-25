import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../Todolist/Header';
import testUtil from '../../../utils/testUtil';

describe('Header组件', () => {
  it('存在一个Input 输入框', () => {
    const wrapper = shallow(<Header />);
    expect(testUtil(wrapper, 'input').length).toBe(1);
  });
  it('Input输入框初始值为空', () => {
    const wrapper = shallow(<Header />);
    expect(testUtil(wrapper, 'input')).toHaveProp('value', '');
  });
  it('Input输入框的值跟随用户输入变化', () => {
    const wrapper = shallow(<Header />);
    const inputEle = testUtil(wrapper, 'input');
    const inputValue = '输入jest测试';
    inputEle.simulate('change', {
      target: {
        value: inputValue
      }
    });
    expect(wrapper.state('value')).toEqual(inputValue);  //数据测试， 偏向于单元测试
  
    // const newInputEle = testUtil(wrapper, 'input'); //DOM 测试， 偏向于集成测试
    // //expect(newInputEle.prop('value')).toEqual(inputValue);
  
    // expect(newInputEle).toHaveProp('value', inputValue);
  });
  
  //  这个忘了， 无值时， 应该如何 校验无操作～～ 就是传入的函数不调用
  it('Input输入框无值时，回车时无操作', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUodoItem={fn}/>);
    const inputEle = testUtil(wrapper, 'input');
    wrapper.setState({
      value: ''
    });
    inputEle.simulate('keyUp', {
      keyCode: 13
    });
    expect(fn).not.toHaveBeenCalled();
  
  });
  
  it('Input有值时回车，且调用父级传入的addUodoItem， 内容清空', () => {
    const fn = jest.fn();
    const wrapper = shallow(<Header addUndoItem={fn} />);
    const inputEle = testUtil(wrapper, 'input');
    const value = '测试有没有调用？？';
    wrapper.setState({
      value: value
    });
    inputEle.simulate('keyUp', {
      keyCode: 13
    });
    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenLastCalledWith(value);
    expect(wrapper.state('value')).toEqual('');
  });

});






