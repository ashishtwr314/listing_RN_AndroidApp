import React, {useState} from 'react';
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

function Edit({navigation, route}) {
  const [item, setItem] = useState(route.params.item);

  const saveChanges = async (id) => {

    

    const list = await AsyncStorage.getItem('items');

    const listItems = JSON.parse(list);



    listItems.map(singleItem => {
      if(singleItem.id == id){
        singleItem.itemName = item.itemName;
        singleItem.itemDesc = item.itemDesc;
      }
      return singleItem;
    })

   await AsyncStorage.setItem('items', JSON.stringify(listItems))

   navigation.push("Home")

  };

  return (
    <Container>
      <Content>
        <Form>
          <Item style={styles.inputItem} fixedLabel>
            <Input
              value={item.itemName}
              onChangeText={(text) => setItem( { ...item, itemName: text } )}
              placeholder="Enter Your Item"
            />
          </Item>
          <Item style={styles.inputItem} fixedLabel last>
            <Input
              onChangeText={(text) => setItem( { ...item, itemDesc: text } )}
              value={item.itemDesc}
              placeholder="Enter Your Description"
            />
          </Item>

          <Button
            onPress={() => saveChanges(item.id)}
            style={styles.submitButton}>
            <Text>Save Changes</Text>
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

export default Edit;
