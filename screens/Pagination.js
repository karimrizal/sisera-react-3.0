import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const Pagination = ({ total, current, onPageChange }) => {
  const visiblePages = 5; // Number of pages to show in the pagination
  const totalPages = Math.ceil(total);

  const startPage = Math.max(1, current - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
      {pages.map(page => (
        <TouchableOpacity key={page} onPress={() => onPageChange(page)}>
          <Text style={{ padding: 10, margin: 5, backgroundColor: current === page ? 'blue' : 'gray', color: 'white' }}>
            {page}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Pagination;