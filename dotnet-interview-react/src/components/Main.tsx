import React from 'react';

const Main: React.FC = () => {
  return (
    <main style={{ flexGrow: 1, padding: '20px' }}>
      <p>This site is dedicated to providing answers to common .NET interview questions.</p>
      <ul>
        <li><a href="#">Question 1: What is .NET?</a></li>
        <li><a href="#">Question 2: What is C#?</a></li>
        <li><a href="#">Question 3: What is ASP.NET?</a></li>
      </ul>
    </main>
  );
};

export default Main;
