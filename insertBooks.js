const mongoose = require('mongoose');
const Book = require('./models/Book');

mongoose.connect(
  "mongodb+srv://libraryUser:lib404@librarycluster.lqldlo5.mongodb.net/?appName=libraryCluster"
)
.then(async () => {
  console.log("MongoDB connected for inserting books");

  await Book.insertMany([
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Programming",
      publishedYear: 2008,
      availableCopies: 5
    },
    {
      title: "Java Concurrency in Practice",
      author: "Brian Goetz",
      category: "Programming",
      publishedYear: 2015,
      availableCopies: 3
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self-Help",
      publishedYear: 2018,
      availableCopies: 6
    },
    {
      title: "Deep Work",
      author: "Cal Newport",
      category: "Self-Help",
      publishedYear: 2016,
      availableCopies: 4
    },
    {
      title: "AI Basics",
      author: "Tom Taulli",
      category: "AI",
      publishedYear: 2019,
      availableCopies: 7
    },
    {
      title: "MongoDB Guide",
      author: "Kristina Chodorow",
      category: "Database",
      publishedYear: 2016,
      availableCopies: 2
    },
    {
      title: "Linux Bible",
      author: "Christopher Negus",
      category: "OS",
      publishedYear: 2020,
      availableCopies: 8
    }
  ]);

  console.log("7 books inserted successfully");
  mongoose.connection.close();
})
.catch(err => console.error(err));