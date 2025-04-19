import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
