import React from 'react';
import Directory from '../../components/directory/Directory'
import HomePageContainer from './homepage.styles';
import './homepage.scss';

const HomePage = ({ history }) => (
  <HomePageContainer>
    <Directory history={history} />
  </HomePageContainer>
);

export default HomePage;