import React from "react";
import { connect } from "react-redux";
import GuestNavigation from "./navigate/Guest";
import LoggedNavigation from "./navigate/Logged";
import AdminNavigation from "./navigate/Admin";

export class App extends React.Component {
  render() {
    const { authToken, user } = this.props;
    if (authToken && user) {
      if (user.role === "Seller" || user.role === "Customer") {
        return <LoggedNavigation />;
      } else {
        return <AdminNavigation />;
      }
    } else {
      return <GuestNavigation />;
    }
  }
}

const mapStateToProps = (state) => ({
  authToken: state.appData.authToken,
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
