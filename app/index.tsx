import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>OneSiam CRM</Text>
        <Text style={styles.title}>Menu</Text>
        <Link style={styles.subtitle} href="/pages/ScanCode">Scan QrCode</Link>
        <Link style={styles.subtitle} href="/pages/SocketTest">Socket Test</Link>

        <Link style={styles.subtitle} href="/jobs/313123">View user</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
