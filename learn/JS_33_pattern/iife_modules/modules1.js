export let users = ["fkfkfk9", "hans", "유종현"];
// 함수형 프로그래밍
export const addUser = user => (users = [...users, user]);

export const getUsers = () => users;

export const deleteUser = user =>
  (users = users.filter(aUser => aUser !== user));
