import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Fab,
  Icon,
  Container,
  H1,
  List,
  ListItem,
  Body,
  Right,
  Button,
  Left,
  H3,
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';

function Home({navigation, route}) {
  const [items, setItems] = useState([{itemName: 'Hiii'}]);

  const getItems = async () => {
    const itemsString = await AsyncStorage.getItem('items');
    const items = JSON.parse(itemsString);

    console.log(items);

    if (items) {
      setItems(items);
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  if (items.length == 0) {
    return (
      <Container style={{padding: 20}}>
        <H1>NO ITEMS TO SHOW</H1>
        <Fab onPress={() => navigation.push('Add')} position="bottomRight">
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }

  const deleteEntry = async (id) => {
    const newList = await items.filter((item) => item.id != id);
    console.log(newList);
    AsyncStorage.setItem('items', JSON.stringify(newList))
      .then((res) => {
        setItems(newList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <List>
        {items.map((item) => (
          <ListItem
            key={item.id}
            style={{display: 'flex', justifyContent: 'space-around'}}>
            <Body style={{flexBasis: '0%'}}>
              <H3 style={{fontSize: 20, marginLeft: 10}}>{item.itemName}</H3>
              <Text note>{item.itemDesc}</Text>
            </Body>

            <Right
              style={{
                justifyContent: 'flex-end',
                flexBasis: '50%',
                flexDirection: 'row',
              }}>
              <Button
                onPress={() => deleteEntry(item.id)}
                style={{marginRight: 10}}>
                <Icon name="trash" />
              </Button>

              <Button onPress={() => navigation.push('Edit', {item})}>
                <Icon name="edit" type="Feather" />
              </Button>
            </Right>
          </ListItem>
        ))}
      </List>

      <Fab onPress={() => navigation.push('Add')} position="bottomRight">
        <Icon name="add" />
      </Fab>
    </Container>
  );
}

export default Home;
