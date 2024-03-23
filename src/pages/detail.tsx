import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>

interface DetailProps {
    route: DetailScreenRouteProp;
    navigation: DetailScreenNavigationProp
}

const Detail: React.FC<DetailProps> = ({ route, navigation }) => {
    const { name, description, favor, avatar } = route.params;

    return (
        <SafeAreaView>
            <View style={styles.appbar}>
                <Text style={styles.appbar_title}>
                    Appliance
                </Text>
                <TouchableHighlight style={styles.back_icon} onPress={() => navigation.goBack()}>
                    <Ionicon name="arrow-back" size={30} color="#ffffff" />
                </TouchableHighlight>
                <TouchableHighlight style={styles.remove_icon} onPress={() => navigation.goBack()}>
                    <AntDesignIcon name="delete" size={30} color="#ffffff" />
                </TouchableHighlight>
            </View>
            <Image source={require('../../assets/img/fridge.png')} alt="Gradient" style={{ width: '100%', height: 300 }} />
            <View style={styles.backgroundStyle}>
                <View style={styles.nameWrapper}>
                    <Text style={{ color: 'blue', fontSize: 20 }}>Name</Text>
                    <Text style={{ fontSize: 18 }}>{name}</Text>
                </View>
                <Text style={{ color: 'blue', fontSize: 20, marginBottom: 10 }}>Description</Text>
                {/* <Text style={{ fontSize: 18 }}>{description}</Text> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    appbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#61A6FF',
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 10,
        width: '100%'
    },
    appbar_title: {
        fontWeight: '500',
        color: '#ffffff',
        fontSize: 30,
    },
    back_icon: {
        position: 'absolute',
        left: 20,
        bottom: 10
    },
    remove_icon: {
        position: 'absolute',
        right: 20,
        bottom: 10
    },
    backgroundStyle: {
        backgroundColor: '#dddddd',
        height: '100%',
        paddingHorizontal: 20
    },
    nameWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginVertical: 20,
        alignItems: 'center'
    },
});

export default Detail;