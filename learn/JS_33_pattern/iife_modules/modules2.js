// 에러가 난다 브라우저는 import, export를 이해 못한다.
import { users, addUser, getUsers, deleteUser } from "./modules1.js";

console.log(getUsers());
addUser("fkfkfk999");
console.log(getUsers());
deleteUser("유종현");
console.log(getUsers());
