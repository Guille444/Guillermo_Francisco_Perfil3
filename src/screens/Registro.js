import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from "../config/firebase";
import Input from '../components/Input';  // Asegúrate de que la ruta sea correcta
import Button from '../components/Button';  // Asegúrate de que la ruta sea correcta

const Registro = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const auth = getAuth(app);

    const handleSignIn = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                Alert.alert('Éxito', 'Cuenta registrada exitosamente');
                irLogin();
                const user = userCredential.user;
                console.log(user);
                setEmail("");
                setName("");
                setLastName("");
                setPassword("");
            })
            .catch(error => {
                console.log(error);
                Alert.alert(error.message);
            });
    };

    const irLogin = async () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../images/vector.png')}
                    style={styles.logo}
                />
            </View>
            <Text style={styles.welcomeText}>Regístrate</Text>
            <Input
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            <Input
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
            />
            <Input
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button
                onPress={handleSignIn}
                title="REGISTRARSE"
                style={styles.RegistroButton}
            />
            <TouchableOpacity onPress={irLogin}>
                <Text style={styles.loginText}>
                    ¿Ya tienes una cuenta? <Text style={styles.loginLink}>Inicia sesión</Text>
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4294FF',
    },
    RegistroButton: {
        marginBottom: 20,
    },
    loginText: {
        color: '#888',
    },
    loginLink: {
        color: '#4294FF',
        fontWeight: 'bold',
    },
});

export default Registro;
