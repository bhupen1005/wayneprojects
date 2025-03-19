# JSON Server Guide

This guide will help you understand how to use `db.json` to add new entities and provide information on all possible endpoints that json-server provides.

## Adding New Entities

To add new entities to `db.json`, simply follow the structure of the existing entities. For example, to add a new user, you can add a new object to the `users` array:

```json
{
  "id": 5,
  "name": "New User",
  "username": "newuser",
  "email": "newuser@example.com"
}
```

Similarly, you can add new posts and projects by following the structure of the existing objects in the `posts` and `projects` arrays.

## Endpoints

Here are all the possible endpoints that json-server provides:

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get a user by ID
- `POST /users` - Add a new user
- `PUT /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID

### Posts

- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a post by ID
- `POST /posts` - Add a new post
- `PUT /posts/:id` - Update a post by ID
- `DELETE /posts/:id` - Delete a post by ID

### Projects

- `GET /projects` - Get all projects
- `GET /projects/:id` - Get a project by ID
- `POST /projects` - Add a new project
- `PUT /projects/:id` - Update a project by ID
- `DELETE /projects/:id` - Delete a project by ID

## Direct Testing Links

You can test the APIs directly in your browser using the following links:

### Users

- [Get all users](http://localhost:3000/users)
- [Get user by ID](http://localhost:3000/users/1)
- [Add a new user](http://localhost:3000/users) (Use POST method)
- [Update a user by ID](http://localhost:3000/users/1) (Use PUT method)
- [Delete a user by ID](http://localhost:3000/users/1) (Use DELETE method)

### Posts

- [Get all posts](http://localhost:3000/posts)
- [Get post by ID](http://localhost:3000/posts/1)
- [Add a new post](http://localhost:3000/posts) (Use POST method)
- [Update a post by ID](http://localhost:3000/posts/1) (Use PUT method)
- [Delete a post by ID](http://localhost:3000/posts/1) (Use DELETE method)

### Projects

- [Get all projects](http://localhost:3000/projects)
- [Get project by ID](http://localhost:3000/projects/1)
- [Add a new project](http://localhost:3000/projects) (Use POST method)
- [Update a project by ID](http://localhost:3000/projects/1) (Use PUT method)
- [Delete a project by ID](http://localhost:3000/projects/1) (Use DELETE method)

## Running JSON Server

To run json-server, use the following command:

```bash
json-server --watch db.json
```

To run json-server using nodemon
```bash
nodemon --exec "json-server --watch db.json --port 5000"
```

This will start a server at `http://localhost:3000` and you can use the above endpoints to interact with the data.
