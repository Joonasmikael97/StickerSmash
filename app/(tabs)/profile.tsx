import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle" size={80} color="#ffd33d" />
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="person" size={24} color="#ffd33d" />
          <Text style={styles.text}>Joonas</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="code-working" size={24} color="#ffd33d" />
          <Text style={styles.text}>Software Engineer</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location" size={24} color="#ffd33d" />
          <Text style={styles.text}>Turku,Finland</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail" size={24} color="#ffd33d" />
          <Text style={styles.text}>Joonas.ronkko@edu.turkuamk.fi</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 30,
  },
  infoContainer: {
    backgroundColor: "#18191a",
    padding: 20,
    borderRadius: 15,
    width: "85%",
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 5,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 15,
  },
});
