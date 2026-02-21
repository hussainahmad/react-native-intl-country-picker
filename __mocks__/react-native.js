/* Minimal mock for react-native so Jest can load components that depend on it. */
const React = require('react');

const createMockComponent = (name) => {
  const Comp = (props) => (props.children ?? null);
  Comp.displayName = name;
  return Comp;
};

const MockTextInput = React.forwardRef((props, ref) => {
  React.useEffect(() => {
    if (ref) {
      if (typeof ref === 'object') ref.current = { focus: () => {} };
      else if (typeof ref === 'function') ref({ focus: () => {} });
    }
  }, [ref]);
  return null;
});
MockTextInput.displayName = 'TextInput';

module.exports = {
  View: createMockComponent('View'),
  Text: createMockComponent('Text'),
  TextInput: MockTextInput,
  TouchableOpacity: createMockComponent('TouchableOpacity'),
  StyleSheet: {
    create: (styles) => styles,
  },
  I18nManager: {
    isRTL: false,
  },
  NativeModules: {},
  Platform: { OS: 'ios' },
};
