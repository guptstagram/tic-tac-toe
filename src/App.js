import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ChoosePlayModeComponent from "./components/ChoosePlayModeComponent";
import ChooseYourSide from "./components/ChooseYourSide";
import PlayingBoardComponent from "./components/PlayingBoardComponent";

const App = () => {
  const [selectedSettings, setSelectedSettings] = React.useState({
    mode:"",
    side:"",
  });

  const playMode = (mode) => {
    setSelectedSettings({
      ...selectedSettings,
      mode:mode,
    })
  };
  const playSide = (side) => {
    setSelectedSettings({
      ...selectedSettings,
      side:side,
    })
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <ChoosePlayModeComponent playMode={playMode}/>
        </Route>
        <Route exact path="/choose-side">
          <ChooseYourSide playSide={playSide}/>
        </Route>
        <Route exact path="/play">
          <PlayingBoardComponent selectedSettings={selectedSettings}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
