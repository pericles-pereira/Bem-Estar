import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../contexts/AuthContext'; // contexto direto

const { height } = Dimensions.get('window');

interface WelcomeProps {
  onLoginSuccess?: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, register, googleLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  // --- Login ---
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha e-mail e senha para continuar.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      onLoginSuccess?.();
    } catch (error: any) {
      // Erro já tratado no AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  // --- Cadastro ---
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Atenção', 'Preencha todos os campos para se cadastrar.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    try {
      await register(name, email, password);
      onLoginSuccess?.();
    } catch (error: any) {
      // Erro já tratado no AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await googleLogin();
      onLoginSuccess?.();
    } catch (error: any) {
      // Erro já tratado no AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Header />

        {isRegistering ? (
          <RegisterForm
            name={name}
            email={email}
            password={password}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            onRegister={handleRegister}
            isLoading={isLoading}
          />
        ) : (
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onLogin={handleLogin}
            isLoading={isLoading}
          />
        )}

        <Divider />

        {!isRegistering && <GoogleLoginButton onPress={handleGoogleLogin} isLoading={isLoading} />}

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.signupText}>
            {isRegistering
              ? 'Já tem conta? Faça login aqui.'
              : 'Não tem conta? Cadastre-se aqui.'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Header ---
const Header: React.FC = () => (
  <View style={styles.header}>
    <FeatherIcon name="heart" size={36} color="#8A2BE2" style={styles.heartIcon} />
    <Text style={styles.logoTitle}>Bem-Estar+</Text>
    <Text style={styles.logoSubtitle}>Acesse ou crie sua conta.</Text>
  </View>
);

// --- Formulário Login ---
interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  onLogin: () => void;
  isLoading: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  isLoading,
}) => (
  <View style={styles.form}>
    <Text style={styles.cardTitle}>Acessar Conta</Text>

    <InputField
      icon={<FeatherIcon name="mail" size={20} color="#8A2BE2" />}
      placeholder="E-mail"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
    />

    <InputField
      icon={<FeatherIcon name="lock" size={20} color="#8A2BE2" />}
      placeholder="Senha"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />

    <TouchableOpacity 
      style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
      onPress={onLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.loginButtonText}>Entrar</Text>
      )}
    </TouchableOpacity>
  </View>
);

// --- Formulário Cadastro ---
interface RegisterFormProps {
  name: string;
  email: string;
  password: string;
  setName: (text: string) => void;
  setEmail: (text: string) => void;
  setPassword: (text: string) => void;
  onRegister: () => void;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  email,
  password,
  setName,
  setEmail,
  setPassword,
  onRegister,
  isLoading,
}) => (
  <View style={styles.form}>
    <Text style={styles.cardTitle}>Criar Conta</Text>

    <InputField
      icon={<FeatherIcon name="user" size={20} color="#8A2BE2" />}
      placeholder="Nome completo"
      value={name}
      onChangeText={setName}
    />

    <InputField
      icon={<FeatherIcon name="mail" size={20} color="#8A2BE2" />}
      placeholder="E-mail"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
    />

    <InputField
      icon={<FeatherIcon name="lock" size={20} color="#8A2BE2" />}
      placeholder="Senha"
      value={password}
      onChangeText={setPassword}
      secureTextEntry
    />

    <TouchableOpacity 
      style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
      onPress={onRegister}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={styles.loginButtonText}>Cadastrar</Text>
      )}
    </TouchableOpacity>
  </View>
);

// --- Reutilizáveis ---
interface InputFieldProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
}) => (
  <View style={styles.inputContainer}>
    {icon}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  </View>
);

const Divider: React.FC = () => <Text style={styles.orText}>OU</Text>;

interface GoogleLoginButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onPress, isLoading = false }) => (
  <TouchableOpacity 
    style={[styles.googleButton, isLoading && styles.buttonDisabled]} 
    onPress={onPress}
    disabled={isLoading}
  >
    {isLoading ? (
      <ActivityIndicator color="#C44535" />
    ) : (
      <>
        <FontAwesomeIcon name="google" size={22} color="#C44535" style={{ marginRight: 10 }} />
        <Text style={styles.googleButtonText}>Entrar com Google</Text>
      </>
    )}
  </TouchableOpacity>
);

// --- Estilos ---
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8A2BE2' },
  loginCard: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  header: { alignItems: 'center', marginBottom: 20 },
  heartIcon: { marginBottom: 10 },
  logoTitle: { fontSize: 28, fontWeight: 'bold', color: '#8A2BE2' },
  logoSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  form: { width: '100%', alignItems: 'center' },
  cardTitle: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F0F0FF',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  input: { flex: 1, color: '#333', fontSize: 16, paddingLeft: 10 },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#8A2BE2',
    borderRadius: 10,
    paddingVertical: 14,
    marginBottom: 10,
    marginTop: 10,
  },
  loginButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  buttonDisabled: {
    opacity: 0.7,
  },
  signupText: {
    color: '#8A2BE2',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  orText: { color: '#999', fontSize: 14, marginVertical: 15, textAlign: 'center' },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  googleButtonText: { color: '#333', fontSize: 16, fontWeight: '600' },
});

export default Welcome;
