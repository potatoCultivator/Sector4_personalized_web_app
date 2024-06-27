// ButtonClickContext.js
import React from 'react';

const ButtonClickContext = React.createContext({
  hasClicked: false,
  setHasClicked: () => {}
});

export default ButtonClickContext;