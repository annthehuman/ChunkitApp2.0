import React from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 70%;
`

const Home = () => {
  return(
    <>
    <Link to='constructor'>
    <Button>Constructor</Button>
    </Link>
    </>
)
}

export default Home;