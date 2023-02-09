import React, { useState } from 'react';
import { createContext } from 'react';

const ActiveContext = createContext({
  active: 4,
  moveActive: () => {},
});

interface Children {
  children: JSX.Element | JSX.Element[];
}
function ArticleContext({ children }: Children) {
  const [active, setActive] = useState(4);
  const moveActive = (): void => {
    setActive(active + 1);
  };

  return (
    <ActiveContext.Provider value={{ active, moveActive }}>
      {children}
    </ActiveContext.Provider>
  );
}

export { ArticleContext, ActiveContext };
