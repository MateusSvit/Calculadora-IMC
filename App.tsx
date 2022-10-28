import { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function calcularImc(altura: number, peso: number): number {
  let IMC: number = peso / (altura * altura);
  return IMC;
}

function verificarIMC(imc: number) {
  if (imc < 17) {
    return "Muito abaixo do peso";
  } else if (imc >= 17 && imc <= 18.49) {
    return "Abaixo do peso";
  } else if (imc >= 18.5 && imc <= 24.99) {
    return "Peso normal";
  } else if (imc >= 25 && imc <= 29.99) {
    return "Acima do peso";
  } else if (imc >= 30 && imc <= 34.99) {
    return "Obesidade I";
  }
}

export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const imc = calcularImc(Number(altura), Number(peso));

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>
      <View style={{ width: "100%" }}>
        <Text style={styles.label}>Peso</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Ex: 75"
          style={styles.input}
          value={peso}
          onChangeText={(value) => setPeso(value)}
        />
      </View>
      <View style={{ width: "100%", paddingVertical: 32 }}>
        <Text style={styles.label}>Altura</Text>
        <TextInput
          keyboardType="numeric"
          placeholder="Ex: 1.75"
          style={styles.input}
          value={altura}
          onChangeText={(value) => setAltura(value)}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {"Seu IMC é de " + imc.toFixed(2)}
            </Text>
            <Text style={styles.mensagem}>{verificarIMC(imc)}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Recalcular</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonCalcular]}
        onPress={() => setModalVisible(!modalVisible)}
        disabled={!altura || !peso}
      >
        <Text style={styles.textStyle}>Calcular</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#748386",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  input: {
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: 48,
    borderRadius: 20,
    padding: 10,
    fontSize: 20,
  },
  label: {
    color: "white",
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    marginHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  modalView: {
    justifyContent: "center",
    margin: 20,
    height: "70%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 30,
    elevation: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  buttonCalcular: {
    backgroundColor: "black",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    textAlign: "center",
    fontSize: 25,
  },
  titulo: {
    fontSize: 30,
    marginBottom: 32,
  },
  mensagem: {
    fontSize: 30,
    color: "black",
    marginVertical: 100,
    marginBottom: 100,
    marginTop: 60,
  },
});
