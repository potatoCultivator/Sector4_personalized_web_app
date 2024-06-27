// ButtonClickContext.js
import React from 'react';

const ButtonClickContext = React.createContext({
  hasClicked: false,
  setHasClicked: () => {}
});

export default ButtonClickContext;

// ButtonClickProvider.js
import React, { useState } from 'react';
import ButtonClickContext from './ButtonClickContext';

const ButtonClickProvider = ({ children }) => {
  const [hasClicked, setHasClicked] = useState(false);

  return (
    <ButtonClickContext.Provider value={{ hasClicked, setHasClicked }}>
      {children}
    </ButtonClickContext.Provider>
  );
};

export default ButtonClickProvider;

import React, { useContext } from 'react';
import ButtonClickContext from './ButtonClickContext';

const SomeOtherComponent = () => {
  const { hasClicked } = useContext(ButtonClickContext);

  return (
    <div>
      {hasClicked && <p>The button has been clicked!</p>}
    </div>
  );
};