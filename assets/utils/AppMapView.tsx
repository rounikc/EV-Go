import React, { useContext } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';
import MapViewStyle from './MapViewStyle.json';
import { UserLocationContext } from './UserLocationContext';

export default function AppMapView() {

  const {location, setLocation} = useContext(UserLocationContext);

  return location?.latitude&&(
    <View>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        region={{
          latitude: location?.latitude,
          longitude: location?.longitude,
          latitudeDelta: 0.0422,
          longitudeDelta: 0.0421
        }}
      >
        <Marker 
          coordinate={{
            latitude: location?.latitude,
            longitude: location?.longitude,
          }}
        >
          <Image 
            source={require('./../images/car-map-marker.jpg')}
            style={{width: 40, height: 39}}
          />
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
