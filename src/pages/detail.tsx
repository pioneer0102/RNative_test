import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {
    remoteItembyId,
    editItem
} from '../store/reducers/itemSlice';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>

interface DetailProps {
    route: DetailScreenRouteProp;
    navigation: DetailScreenNavigationProp
}

const emtpyImageUrl = 'file:///storage/emulated/0/Pictures/empty.png';

const Detail: React.FC<DetailProps> = ({ route, navigation }) => {
    const dispatch = useDispatch();

    const { id, name, description, favor, avatar } = route.params;

    const [detailFavor, setDetailFavor] = useState(favor);

    const _removeItem = (id: string) => {
        Alert.alert('Remove', 'Are you sure to remove this?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    dispatch(remoteItembyId(id));
                    navigation.goBack();
                }
            },
        ]);

    }

    const handleEdit = () => {
        setDetailFavor(prev => !prev);
        const temp = {
            id: id,
            favor: detailFavor
        }
        dispatch(editItem(temp));
    }

    return (
        <SafeAreaView>
            <View style={styles.appbar}>
                <Text style={styles.appbar_title}>
                    {name}
                </Text>
                <TouchableOpacity style={styles.back_icon} onPress={() => navigation.goBack()}>
                    <Ionicon name="arrow-back" size={30} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.remove_icon} onPress={() => _removeItem(id)}>
                    <AntDesignIcon name="delete" size={30} color="#ffffff" />
                </TouchableOpacity>
            </View>
            <View>
                {
                    avatar === '' || null ?
                        <View style={{ backgroundColor: '#8eb481', width: '100%', height: 300 }} /> :
                        <Image source={{ uri: avatar }} alt="Gradient" style={{ width: '100%', height: 300 }} />
                }
                {/* <Image source={{ uri: avatar === '' || null ? emtpyImageUrl : avatar }} alt="Gradient" style={{ width: '100%', height: 300 }} /> */}
                <TouchableOpacity onPress={() => handleEdit()} style={styles.favorIcon}>
                    {detailFavor ?
                        <AntDesignIcon name="star" size={40} color="#FFE86C" /> :
                        <AntDesignIcon name="staro" size={40} color="#FFE86C" />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.backgroundStyle}>
                <View style={styles.nameWrapper}>
                    <Text style={{ color: 'blue', fontSize: 20 }}>Name</Text>
                    <Text style={{ fontSize: 18 }}>{name}</Text>
                </View>
                <Text style={{ color: 'blue', fontSize: 20, marginBottom: 10 }}>Description</Text>
                <Text style={{ fontSize: 18, textAlign: 'justify' }}>{description}</Text>
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
    favorIcon: {
        position: 'absolute',
        right: 20,
        top: 20,
        padding: 10
    },
});

export default Detail;