import React from 'react';
import ReactDOM from 'react-dom';
import FrosmoPlacement from '../FrosmoPlacement';

// mock components
const FuncComponent = () => <div>function component content</div>;

class ClassComponent extends React.Component {
    render () {
        return <div>class component content</div>;
    }
}

describe('FrosmoPlacement', () => {
  it('should render FrosmoPlacement without crashing', () => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    ReactDOM.render(<FrosmoPlacement id="test-101" defaultComponent={FuncComponent}/> , div1);
    ReactDOM.render(<FrosmoPlacement id="test-102" defaultComponent={ClassComponent}/> , div2);
  });

  it('should render FrosmoPlacement with default component', () => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    ReactDOM.render(<FrosmoPlacement id="test-101" defaultComponent={ClassComponent}/> , div1);
    ReactDOM.render(<FrosmoPlacement id="test-102" defaultComponent={FuncComponent}/> , div2);
    expect(div1.textContent).toBe('class component content');
    expect(div2.textContent).toBe('function component content');
  });
});
