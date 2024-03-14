import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

const MenuButton = () => (
  <IconButton
    icon="menu"
    iconColor="white"
    size={40}
    onPress={() => console.log('Pressed')}
  />
);

export default MenuButton;