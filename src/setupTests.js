import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
configure({ adapter: new Adapter(), disableLifecycleMethods: true });

global.shallow = shallow;
global.React = React;
global.renderer = renderer;
