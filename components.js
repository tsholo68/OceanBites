// components/MenuList.js
// Displays every menu item the chef has added, using FlatList so the
// list automatically re-renders whenever a new item is added.
// Shows a friendly message when there are no items yet.

import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants/theme';

const COURSE_COLORS = {
  Starters: '#3FA7D6',
  Mains: '#0B3C5D',
  Desserts: '#E08E45',
  Beverages: '#2E8B57',
};

function MenuItemCard({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <Text style={styles.price}>R{item.price}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View
        style={[
          styles.coursePill,
          { backgroundColor: COURSE_COLORS[item.course] || COLORS.aqua },
        ]}
      >
        <Text style={styles.coursePillText}>{item.course}</Text>
      </View>
    </View>
  );
}

export default function MenuList({ items }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Menu Items</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{items.length}</Text>
        </View>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>🍽️</Text>
          <Text style={styles.emptyText}>No menu items added yet.</Text>
          <Text style={styles.emptySubtext}>
            Use the form above to add your first dish.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuItemCard item={item} />}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: SPACING.lg }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.heading,
    fontWeight: '700',
    color: COLORS.navy,
    marginRight: SPACING.sm,
  },
  countBadge: {
    backgroundColor: COLORS.navy,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.small,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.md,
  },
  emptyEmoji: {
    fontSize: 36,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontSize: FONT_SIZES.body,
    fontWeight: '600',
    color: COLORS.navy,
  },
  emptySubtext: {
    fontSize: FONT_SIZES.small,
    color: COLORS.subtitle,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    color: COLORS.navy,
    flexShrink: 1,
    marginRight: SPACING.sm,
  },
  price: {
    fontSize: FONT_SIZES.body,
    fontWeight: '700',
    color: COLORS.aqua,
  },
  description: {
    fontSize: FONT_SIZES.small,
    color: COLORS.subtitle,
    marginTop: SPACING.xs,
  },
  coursePill: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    marginTop: SPACING.sm,
  },
  coursePillText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.small,
    fontWeight: '600',
  },
});