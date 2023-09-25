import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Text, StyleSheet, View, Button } from 'react-native';
import { Link } from "expo-router";
import { nextService } from "../../service/api.service";

const SocketTest = () => {
    const [message, setMessage] = useState<string>('');


    
  useEffect(() => {
    fetchData()

  }, []);

  const fetchData = () =>{
    nextService().then((res)=>{
        setMessage(res)
    }).catch((err)=>{
        console.log('err -> ',err)
    })
}



    return <View style={styles.container}>
        <Text style={styles.title} >Socket post: {message}</Text>
        {/* <Button title="Send Message" onPress={sendMessage} /> */}
        <Link style={styles.title} href="/">Home</Link>
    </View>
}


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

export default SocketTest