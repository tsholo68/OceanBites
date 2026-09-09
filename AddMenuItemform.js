// components/AddMenuItemForm.js
// Captures Dish Name, Description, Course and Price for a new menu item.
// Validates required fields and shows inline error messages before
// allowing the chef to add the item to the list.

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

const COURSES = ['Starters', 'Mains', 'Desserts', 'Beverages'];

export default function AddMenuItemForm({ onAddItem }) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(COURSES[0]);
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!dishName.trim()) {
      newErrors.dishName = 'Dish name is required.';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (!price.trim()) {
      newErrors.price = 'Price is required.';
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Enter a valid price greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    onAddItem(newItem);

    setDishName('');
    setDescription('');
    setCourse(COURSES[0]);
    setPrice('');
    setErrors({});
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Add a Menu Item</Text>

      <Text style={styles.label}>Dish Name</Text>
      <TextInput
        style={[styles.input, errors.dishName && styles.inputError]}
        placeholder="e.g. Grilled Salmon"
        placeholderTextColor="#9BB8C9"
        value={dishName}
        onChangeText={setDishName}
      />
      {errors.dishName ? <Text style={styles.errorText}>{errors.dishName}</Text> : null}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea, errors.description && styles.inputError]}
        placeholder="Briefly describe the dish"
        placeholderTextColor="#9BB8C9"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />
      {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

      <Text style={styles.label}>Course</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={course}
          onValueChange={(value) => setCourse(value)}
          style={styles.picker}
        >
          {COURSES.map((c) => (
            <Picker.Item key={c} label={c} value={c} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={[styles.input, errors.price && styles.inputError]}
        placeholder="e.g. 185.00"
        placeholderTextColor="#9BB8C9"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />
      {errors.price ? <Text style={styles.errorText}>{errors.price}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Add Menu Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    marginHorizontal: SPACING.md,
    marginTop: SPACING.md,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: FONT_SIZES.heading,
    fontWeight: '700',
    color: COLORS.navy,
    marginBottom: SPACING.sm,
  },
  label: {
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
    color: COLORS.subtitle,
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.offWhite,
    borderRadius: 10,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.body,
    color: COLORS.text,
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZES.small,
    marginTop: SPACING.xs,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.offWhite,
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    color: COLORS.text,
  },
  button: {
    backgroundColor: COLORS.aqua,
    borderRadius: 10,
    paddingVertical: SPACING.sm + 2,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: FONT_SIZES.body,
  },
});