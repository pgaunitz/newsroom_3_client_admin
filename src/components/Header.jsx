import React from "react";
import { Segment, Menu } from "semantic-ui-react";
import {connect} from 'react-redux'

const Header = () => {

  return (
    <div>
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item>Welcome to Mars Times Admin</Menu.Item>
        </Menu>
      </Segment>
    </div>
  );
};


export default connect()(Header);
