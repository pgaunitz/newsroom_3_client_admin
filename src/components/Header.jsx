import React from "react";
import { Segment, Menu } from "semantic-ui-react";
import {connect} from 'react-redux'

const Header = () => {

  return (
    <div>
      <Segment inverted>
        <Menu inverted pointing secondary>
        </Menu>
      </Segment>
    </div>
  );
};


export default connect()(Header);
