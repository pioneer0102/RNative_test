import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { createItem } from '../store/reducers/itemSlice';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
// import {
//     launchImageLibrary,
//     ImagePickerResponse,
//     PhotoQuality,
//     MediaType,
// } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';

const includeExtra = true;

type CreateScreenRouteProp = RouteProp<RootStackParamList, 'Create'>;
type CreateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Create'>

interface CreateProps {
    route: CreateScreenRouteProp;
    navigation: CreateScreenNavigationProp
}

var options = {
    title: 'Select Image',
    customButtons: [
        {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
        },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const Create: React.FC<CreateProps> = ({ route, navigation }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [nameAlert, setNameAlert] = useState(false);
    const [descriptionAlert, setDescriptionAlert] = useState(false);
    const [favor, setFavor] = useState<boolean>(false);

    const [response, setResponse] = React.useState<any>(null);

    const chooseFile = (type: string, options: ImagePicker.ImageLibraryOptions) => {
        if (type === 'capture') {
            ImagePicker.launchCamera(options, setResponse);
        } else {
            ImagePicker.launchImageLibrary(options, setResponse);
        }
    };

    const handleName = (name: string) => {
        setName(name);
        if(name !== '') setNameAlert(false)
        if(name === '') setNameAlert(true)
    };

    const handleDescription = (description: string) => {
        setDescription(description);
        if(description !== '') setDescriptionAlert(false)
        if(description === '') setDescriptionAlert(true)
    };

    const handleCreate = () => {
        if (name === '' || description === '') {
            if (name === '') {
                setNameAlert(true);
                if (description === '') {
                    setDescriptionAlert(true);
                }
                if (description !== '') {
                    setDescriptionAlert(false);
                }
            }
            if (name !== '') {
                setNameAlert(false);
                if (description === '') {
                    setDescriptionAlert(true);
                }
                if (description !== '') {
                    setDescriptionAlert(false);
                }
            }

        }
        else {
            setNameAlert(false);
            setDescriptionAlert(false);
            const temp = {
                name: name,
                description: description,
                favor: favor,
                avatar: response?.assets[0].uri || ''
            };
            dispatch(createItem(temp));
            navigation.goBack();
        }
    }

    return (
        <SafeAreaView>
            <View style={styles.appbar}>
                <Text style={styles.appbar_title}>
                    Appliance
                </Text>
                <TouchableOpacity style={styles.back_icon} onPress={() => navigation.goBack()}>
                    <Ionicon name="arrow-back" size={30} color="#ffffff" />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: 300, backgroundColor: '#aaaaaa' }}>
                {response?.assets && <Image source={{ uri: response?.assets[0].uri }} style={{ width: '100%', height: 300 }} />}
                <TouchableOpacity style={{ position: 'absolute', top: '40%', left: '45%', zIndex: 10 }} onPress={() => chooseFile(actions.type, actions.options)}>
                    <AntDesignIcon name="pluscircleo" size={50} color="#cccccc" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFavor((prev) => !prev)} style={styles.favorIcon}>
                    {favor ?
                        <AntDesignIcon name="star" size={40} color="#FFE86C" /> :
                        <AntDesignIcon name="staro" size={40} color="#FFE86C" />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.backgroundStyle}>
                <View style={styles.nameWrapper}>
                    <Text style={{ color: 'blue', fontSize: 20 }}>Name</Text>
                    <TextInput
                        value={name}
                        placeholder='New Appliance'
                        style={nameAlert ? styles.input_alert : styles.input}
                        spellCheck
                        onChangeText={(text) => handleName(text)}
                    />
                    {nameAlert && <Text style={{ color: 'red', fontSize: 20, marginTop: 5 }}>Name field is requried</Text>}
                </View>
                <View style={styles.descriptionWrapper}>
                    <Text style={{ color: 'blue', fontSize: 20, marginBottom: 10 }}>Description</Text>
                    <View style={styles.inputContainer}>
                        {!description && (
                            <Text style={styles.placeholder}>Add some description here ...</Text>
                        )}
                        <TextInput
                            multiline
                            numberOfLines={4}
                            value={description}
                            style={descriptionAlert ? styles.input_alert : styles.input}
                            spellCheck
                            onChangeText={(text) => handleDescription(text)}
                        />
                        {descriptionAlert && <Text style={{ color: 'red', fontSize: 20, marginTop: 5 }}>Description field is requried</Text>}
                    </View>
                </View>
                <TouchableOpacity onPress={() => { handleCreate() }} style={styles.buttonWrapper}>
                    <Text style={styles.button}>
                        Create Appliance
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

interface Action {
    title: string;
    type: 'capture' | 'library';
    options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action = {
    title: 'Select Image',
    type: 'library',
    options: {
        selectionLimit: 0,
        mediaType: 'photo',
        includeBase64: false,
        includeExtra,
    },
}
// {
//     title: 'Take Image',
//     type: 'capture',
//     options: {
//         saveToPhotos: true,
//         mediaType: 'photo',
//         includeBase64: false,
//         includeExtra,
//     },
// },

// {
//     title: 'Take Video',
//     type: 'capture',
//     options: {
//         saveToPhotos: true,
//         formatAsMp4: true,
//         mediaType: 'video',
//         includeExtra,
//     },
// },
// {
//     title: 'Select Video',
//     type: 'library',
//     options: {
//         selectionLimit: 0,
//         mediaType: 'video',
//         formatAsMp4: true,
//         includeExtra,
//     },
// },
// {
//     title: 'Select Image or Video\n(mixed)',
//     type: 'library',
//     options: {
//         selectionLimit: 0,
//         mediaType: 'mixed',
//         includeExtra,
//     },
// },


// if (Platform.OS === 'ios') {
//     actions.push({
//         title: 'Take Image or Video\n(mixed)',
//         type: 'capture',
//         options: {
//             saveToPhotos: true,
//             mediaType: 'mixed',
//             includeExtra,
//             presentationStyle: 'fullScreen',
//         },
//     });
// }

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
    favorIcon: {
        position: 'absolute',
        right: 20,
        top: 20,
        padding: 10
    },
    backgroundStyle: {
        backgroundColor: '#dddddd',
        height: '100%',
        paddingHorizontal: 20
    },
    nameWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginVertical: 20,
    },
    descriptionWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginVertical: 20,
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        padding: 5,
        fontSize: 18
    },
    input_alert: {
        borderBottomColor: '#ff888888',
        borderBottomWidth: 1,
        padding: 5,
        fontSize: 18
    },
    placeholder: {
        position: 'absolute',
        left: 5,
        color: 'gray',
        zIndex: -1,
        fontSize: 18
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: 'auto',
        marginTop: 40
    },
    button: {
        color: '#ffffff',
        fontSize: 20,
        paddingVertical: 15,
        paddingHorizontal: 60,
        backgroundColor: '#61A6FF'
    }
});

export default Create;