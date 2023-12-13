/*****************************************
 * Filename: complex_code.js
 * Description: This code demonstrates a complex implementation
 *              of a social media platform.
 *****************************************/


/*****************************************
 * Part 1: User Class
 *****************************************/

class User {
  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
    this.friends = [];
    this.posts = [];
  }

  addFriend(user) {
    if (!this.friends.includes(user)) {
      this.friends.push(user);
      user.addFriend(this);
    }
  }

  createPost(content) {
    const post = new Post(content, this);
    this.posts.push(post);
  }

  updateEmail(newEmail) {
    this.email = newEmail;
  }
}


/*****************************************
 * Part 2: Post Class
 *****************************************/

class Post {
  constructor(content, author) {
    this.content = content;
    this.author = author;
  }

  updateContent(newContent) {
    this.content = newContent;
  }
}


/*****************************************
 * Part 3: Usage Example
 *****************************************/

// Creating users
const user1 = new User("John Doe", 30, "john.doe@example.com");
const user2 = new User("Jane Smith", 25, "jane.smith@example.com");

// Adding friends
user1.addFriend(user2);

// Creating posts
user1.createPost("Hello, world!");
user2.createPost("I love coding!");

// Updating email
user1.updateEmail("john.doe@gmail.com");

// Outputting user information
console.log(user1);
console.log(user2);