import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Header,
  Left,
  Button,
  Body,
  Right,
  Title,
  Icon,
  Content,
} from 'native-base';

const Layout = (props) => {
  console.log('Layout', props);
  const handleBackButtonClick = () => {
    props.navigation.goBack(null);
    return true;
  };
  return (
    <Container>
      <Header>

        <Left>
          {props.backButton &&
            <Button
              transparent
              onPress={handleBackButtonClick}
            >
              <Icon name='arrow-back' />
            </Button>}

        </Left>
        <Body>
          <Title>MyApp</Title>
        </Body>
        <Right></Right>
      </Header>
      <Content padder>
        {props.children}
      </Content>
    </Container>
  );
};

Layout.propTypes = {
  navigation: PropTypes.object,
  children: PropTypes.any,
  backButton: PropTypes.bool,
};
