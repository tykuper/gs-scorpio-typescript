import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchUsersThunk } from "../store/users";
import UserCard from "../components/UserCard";

const AdminUsersView = (props) => {
  useEffect(() => {
    props.fetchUsers();
  }, []);

  return (
    <div className="container py-5">
      <h4 className="text-center">
        <strong>User List</strong>
      </h4>
      <Row xs={1} md={2} lg={3} className="g-4">
        {props.users?.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    isAdmin: state.auth.isAdmin !== undefined ? state.auth.isAdmin : false,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsersThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsersView);
