import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Dimensions,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BluetoothComponent = () => {
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

  const handleDiscoverPeripheral = device => {
    setDevices(prevDevices => {
      // Avoid duplicates by filtering out devices with the same ID
      const filteredDevices = prevDevices.filter(
        prevDevice => prevDevice.id !== device.id,
      );
      return [...filteredDevices, device];
    });
  };

  const handleStopScan = () => {
    console.log('Scanning stopped');
  };

  useEffect(() => {
    alert();
    BleManager.start({showAlert: false})
      .then(() => {
        alert('Init the module success');
        console.log('Init the module success.');
      })
      .catch(error => {
        console.log('Init the module fail.');
        alert(error);
      });

    BleManager.scan([], 5, true)
      .then((error, device) => {
        alert('BleManager.scan');
        if (error) {
          console.log('Error scanning:', error);
          return;
        }
        console.log('Scan started', device);
        if (device) {
          handleDiscoverPeripheral(device);
        }
      })
      .catch(err => {
        console.log('Scan started fail');
      });

    return () => {
      BleManager.stopScan();
    };
  }, []);

  const handleConnect = async device => {
    try {
      await BleManager.connect(device.id);
      setConnectedDevice(device);
      alert('Connected to device:', device);
    } catch (error) {
      alert('Error connecting:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await BleManager.disconnect(connectedDevice.id);
      setConnectedDevice(null);
      alert('Disconnected from device');
    } catch (error) {
      alert('Error disconnecting:', error);
    }
  };

  const renderItem = ({item}) => (
    <View>
      <Text>{item.name}</Text>
      <Button
        title="Connect"
        onPress={() => handleConnect(item)}
        disabled={connectedDevice !== null}
      />
    </View>
  );

  return (
    <View>
      {connectedDevice ? (
        <View>
          <Text>Connected to: {connectedDevice.name}</Text>
          <Button title="Disconnect" onPress={handleDisconnect} />
        </View>
      ) : null}
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default BluetoothComponent;
