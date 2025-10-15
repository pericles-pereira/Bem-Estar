import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configuração do Google Sign In
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    // Web Client ID do google-services.json
    webClientId: '98741688423-a76au93esrl3hjeojjikqara6dri4e3v.apps.googleusercontent.com',
    
    // Para iOS, adicione o iOS Client ID se necessário
    // iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    
    // Para Android, o Client ID é configurado no google-services.json
    offlineAccess: true, // Para obter refresh token
    hostedDomain: '', // Especifique domínio se for G Suite (opcional)
    forceCodeForRefreshToken: true, // Para iOS
  });
};

export default configureGoogleSignIn;