const allRoles = {
  user: ['getProfile', 'manageProfile', 'getUser'],
  admin: ['getUsers', 'manageUsers', 'getProfiles', 'manageProfiles'],
  freelancer: ['getProfile', 'manageProfile', 'getUserViaToken', 'getUser'],
  client: ['getProfile', 'manageProfile', 'getUser'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
