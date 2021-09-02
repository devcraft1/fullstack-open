import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // login form
  const loginForm = () => (
    <LoginForm
      handleSubmit={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    />
  );
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
      setMessage({ text: `Welcome ${user.name}`, type: 'succe-ss' });
    } catch (exception) {
      setMessage({ text: 'Wrong username or password', type: 'err-or' });
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    }
  };

  // blog form
  const blogForm = () => <BlogForm createBlog={createBlog} />;

  const createBlog = async (blogObject) => {
    try {
      const response = await blogService.create(blogObject);
      setBlogs(blogs.concat(response));
      setMessage({
        text: `a new blog ${response.title} by ${response.author} added`,
        type: 'succe-ss',
      });
    } catch (exception) {
      setMessage({
        text: `${exception}`,
        type: 'errors',
      });
    }
  };

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} is logged-in </p>
          {blogForm()}
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
