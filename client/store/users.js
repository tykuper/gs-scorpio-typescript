import axios from "axios";

const FETCH_USERS = "SET_USERS";

const fetchUsers = (users) => {
  return {
    type: FETCH_USERS,
    users,
  };
};

export const fetchUsersThunk = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get("/api/users");
      dispatch(fetchUsers(users));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.users;
    default:
      return state;
  }
}
