import React, { useEffect, type PropsWithChildren } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';  // Trocar para hook de autenticação



export type NavigationState = 'welcome' | 'dashboard' | 'mood' | 'habit' | 'care' | 'meditation';

export const NativeIcon = ({ name, color = '#6366f1', size = 24 }: { name: string, color?: string, size?: number }) => {
    let emoji = '⭐️'; 
    switch (name) {
        case 'Smile': emoji = '😊'; break;
        case 'TrendingUp': emoji = '📈'; break;
        case 'Heart': emoji = '❤️'; break;
        case 'Brain': emoji = '🧠'; break;
        case 'Mail': emoji = '✉️'; break;
        case 'Lock': emoji = '🔒'; break;
        case 'User': emoji = '👤'; break;
        case 'LogIn': emoji = '🔑'; break;
        case 'Chrome': emoji = '🌐'; break;
        case 'Eye': emoji = '👁️'; break;
        default: emoji = '⚙️'; break;
    }
    return <Text style={{ fontSize: size, color }}>{emoji}</Text>;
};

export const ProtectedRoute: React.FC<PropsWithChildren<{ navigationState: NavigationState, setNavigationState: (state: NavigationState) => void, styles: any }>> = ({ children, navigationState, setNavigationState, styles }) => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user && navigationState !== 'welcome') {
            setNavigationState('welcome'); 
        }
    }, [user, navigationState, setNavigationState]);

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    return <>{children}</>;
};
