// components/HomeScreen.js
// The main screen of the app. Holds the list of menu items in state,
// renders the form to capture new items, and displays the running list.
// Shows a confirmation alert once an item has been successfully added.

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AddMenuItemForm from './AddMenuItemform';
import MenuList from './MenuList';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

export default function HomeScreen() {
  const [menuItems, setMenuItems] = useState([]);

  const handleAddItem = (newItem) => {
    setMenuItems((prevItems) => [newItem, ...prevItems]);

    Alert.alert(
      'Menu Item Added',
      '${newItem.dishName} was added to the menu successfully',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Ocean Bites</Text>
        <Text style={styles.subtitle}>Restaurant Menu Management</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AddMenuItemForm onAddItem={handleAddItem} />
        <MenuList items={menuItems} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },
  header: {
    backgroundColor: COLORS.navy,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: FONT_SIZES.title,
    fontWeight: '700',
  },
  subtitle: {
    color: COLORS.lightBlue,
    fontSize: FONT_SIZES.subtitle,
    marginTop: SPACING.xs,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
});