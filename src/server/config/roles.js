const allRoles = {
  user: ['getProfile'],
  admin: ['getUsers', 'manageUsers', 'getProfiles', 'manageProfiles'],
  freelancer: ['getProfile', 'manageProfile', 'getUserViaToken'],
  client: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export { roles, roleRights };
