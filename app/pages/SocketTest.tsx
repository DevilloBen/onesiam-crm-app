import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SocketIOClient from 'socket.io-client';

const SocketTest = () => {
  const [message, setMessage] = useState<string>('');

  //   const getMovies = async () => {
  //     try {
  //       const response = await fetch('http://10.9.5.168:3000/api/hello');
  //       const json = await response.json();
  //       console.log('json --> ',json)
  //       //setData(json.movies);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       //setLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     getMovies();
  //   }, []);

  // useEffect(() => {
  console.log('Hello');
  const socket = SocketIOClient('http://10.30.25.208:3010/socket-service/event-jobs');
  // Join a room identified by channelId
  socket.emit('joinRoom', { channelId: '123' });

  // Listen for messages from server
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  // Listen for message history from server
  socket.on('messageHistory', (history) => {
    console.log('Received message history:', history);
  });

  // Send a message to the server
  socket.emit('message', { channelId: '123', message: 'Hello, world!' });
  //}, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Socket post: {message}</Text>
        {/* <Button title="Send Message" onPress={sendMessage} /> */}
        <Link style={styles.title} href="/">
          Home
        </Link>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
  },
  cameraContainer: {
    width: '80%',
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 40,
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SocketTest;
