import { User } from './models/index.js';

const users = [
  new User({
    name: 'Kakembo Henry',
    email: 'kakembohenry@showcase.com',
    password: '12kembos',
    isEmailVerified: true,
  }),
  new User({
    name: 'Betty Lou',
    email: 'bettylou@showcase.com',
    password: '12kembos',
    isEmailVerified: true,
  }),
];

export const seedData = async () => {
  try {
    await User.deleteMany({});

    for (let i = 0; i < users.length; i++) {
      users[i].save();
    }
    console.log('Mock data has been seeded from seed script');
  } catch (error) {
    console.log(error);
  }
};
