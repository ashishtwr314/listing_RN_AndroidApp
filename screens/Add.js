import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import shortid from 'shortid';

function Add({navigation, route}) {
  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');

  const storeData = async () => {
    const data = {
      itemName,
      itemDesc,
      id: shortid.generate(),
    };

    if (itemName.length > 1 && itemDesc.length > 1) {
      const itemInStorage = await AsyncStorage.getItem('items');

      console.log(itemInStorage);

      if (itemInStorage) {
        console.log('ITEMS IN STOARGE');
        const itemsString = await AsyncStorage.getItem('items');
        const items = JSON.parse(itemsString);
        items.push(data);

        AsyncStorage.setItem('items', JSON.stringify(items))
          .then((res) => {
            navigation.push('Home');
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        AsyncStorage.setItem('items', JSON.stringify([data]))
          .then((res) => {
            navigation.push('Home');
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <Container>
      <Content>
        <Form>
          <Item style={styles.inputItem} fixedLabel>
            <Input
              value={itemName}
              onChangeText={(text) => setItemName(text)}
              placeholder="Enter Your Item"
            />
          </Item>
          <Item style={styles.inputItem} fixedLabel last>
            <Input
              onChangeText={(text) => setItemDesc(text)}
              value={itemDesc}
              placeholder="Enter Your Description"
            />
          </Item>

          <Button onPress={storeData} style={styles.submitButton}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  inputItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    width: '100%',
  },
  submitButton: {
    marginLeft: 10,
    marginTop: 20,
  },
});

export default Add;
