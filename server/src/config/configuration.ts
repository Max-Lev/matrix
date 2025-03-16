// export default () => ({
//     mongodbUri: process.env.MONGODB_URI,
//   });

  export default () => ({
    database: {
        mongodbUri: process.env.MONGO_URI || 'mongodb://localhost:27017/trainers',
    },
  });
  