const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
  freelancer: [],
  client: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
