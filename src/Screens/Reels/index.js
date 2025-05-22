import React, {useRef, useState} from 'react';
import {View, FlatList, Dimensions, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import {useIsFocused} from '@react-navigation/native';

const {height} = Dimensions.get('window');

const reelsData = [
  {
    id: '1',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: '2',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: '3',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
];

const ReelsScreen = () => {
  const isFocused = useIsFocused(); // ye bataega ke current screen focus mein hai ya nahi
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);

  const onViewableItemsChanged = React.useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentVisibleIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = React.useRef({
    itemVisiblePercentThreshold: 50,
  });

  const renderItem = ({item, index}) => (
    <View style={styles.reelContainer}>
      <Video
        source={{uri: item.uri}}
        style={styles.video}
        resizeMode="contain"
        repeat
        paused={!isFocused || currentVisibleIndex !== index} // agar screen focused nahi ya video active nahi to pause karo
      />
    </View>
  );

  return (
    <FlatList
      data={reelsData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewConfigRef.current}
    />
  );
};

const styles = StyleSheet.create({
  reelContainer: {
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    height: height,
    width: '100%',
  },
});

export default ReelsScreen;
