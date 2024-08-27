import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { ItemType } from '../types/types';
import {
    selectItems,
    remoteItembyId,
    removeSelectedItems
} from '../store/reducers/itemSlice';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

interface HomeProps {
    navigation: HomeScreenNavigationProp;
}

interface showingType {
    id: string,
    name: string,
    description: string,
    favor: boolean,
    avatar: string,
    isShowing: boolean
}

const emtpyImageUrl = 'file:///storage/emulated/0/Pictures/empty.png'

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const dispatch = useDispatch();
    const data = useSelector(selectItems);

    const [showingArray, setShowingArray] = useState<showingType[]>([]);
    const [selectedCount, setSelectedCount] = useState<number>(0);

    useEffect(() => {
        const temp: showingType[] = data.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            favor: item.favor,
            avatar: item.avatar,
            isShowing: false
        }));
        setShowingArray(temp);
    }, [data]);

    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const _onPressListItem = (id: string) => {
        setShowingArray((prev) => (
            prev.map(obj => {
                if (obj.id === id) {
                    return { ...obj, isShowing: !obj.isShowing }
                }
                return obj;
            })
        ));
    };

    useEffect(() => {
        let temp = 0;
        showingArray.forEach(item => {
            if (item.isShowing) {
                temp++;
            }
        });
        setSelectedCount(temp);
    }, [showingArray]);

    const _pageCreate = () => {
        navigation.navigate('Create');
    }

    const _pageDetail = (item: showingType) => {
        navigation.navigate('Detail', {
            id: item.id,
            name: item.name,
            description: item.description,
            favor: item.favor,
            avatar: item.avatar
        })
    }

    const _removeItem = (id: string) => {
        Alert.alert('Remove', 'Are you sure to remove this?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => dispatch(remoteItembyId(id)) },
        ]);
    };

    const _remoteSelectedItems = () => {
        var temp: string[] = [];
        showingArray.map((item) => {
            if (item.isShowing === true) {
                temp.push(item.id);
            }
        });
        Alert.alert('Remove', 'Are you sure to remove selected items?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => dispatch(removeSelectedItems(temp)) },
        ]);
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor="#61A6FF"
            />
            <View style={styles.appbar}>
                <Text style={styles.appbar_title}>
                    Appliance
                </Text>
                <TouchableOpacity
                    style={styles.appbar_icon}
                    onPress={() => _pageCreate()}
                >
                    <FontAwesomeIcon name="plus" size={30} color="#ffffff" />
                </TouchableOpacity>
            </View>
            {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"> */}
            <View style={styles.backgroundStyle}>
                <View style={styles.count_action}>
                    <Text style={styles.count}>
                        Appliance: {data.length}
                    </Text>
                    <View style={styles.actions}>
                        {
                            (selectedCount === 0) ?
                                <View /> :
                                <TouchableOpacity onPress={() => _remoteSelectedItems()}>
                                    <AntDesignIcon name="delete" size={30} color="#000000" />
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <FlatList
                    data={showingArray}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => _onPressListItem(item.id)}
                        >
                            <View style={item.isShowing ? styles.listItem_selected : styles.listItem}>
                                <View style={{ display: 'flex', flexDirection: 'row', gap: 20, marginHorizontal: 15 }}>
                                    {item.isShowing ?
                                        <View>
                                            {
                                                item.avatar === '' || null ?
                                                    <View style={{ backgroundColor: '#7caeb3', width: 130, height: 100 }} /> :
                                                    <Image source={{ uri: item.avatar }} alt="Gradient" style={{ backgroundColor: '#1577ff', opacity: 0.5, zIndex: 1, width: 130, height: 100 }} />
                                            }
                                            {/* <Image source={{ uri: item.avatar === '' || null ? emtpyImageUrl : item.avatar }} alt="Gradient" style={{ backgroundColor: '#0000ff', opacity: 0.5, zIndex: 1, width: 130, height: 100 }} /> */}
                                            <AntDesignIcon style={{ zIndex: 10, position: 'absolute', left: 20, top: 10 }} name="check" color="#ffffff" size={100} />
                                        </View> :
                                        <View>
                                            {
                                                item.avatar === '' || null ?
                                                    <View style={{ backgroundColor: '#8eb481', width: 130, height: 100 }} /> :
                                                    <Image source={{ uri: item.avatar }} alt="Gradient" style={{ width: 130, height: 100 }} />
                                            }
                                        </View>
                                        // <Image source={{ uri: item.avatar === '' || null ? emtpyImageUrl : item.avatar }} alt="Gradient" style={{ width: 130, height: 100 }} />
                                    }
                                    <View>
                                        <View style={styles.nameWrapper}>
                                            <Text
                                                style={styles.name}>
                                                {item.name}
                                            </Text>
                                            {item.favor ?
                                                <AntDesignIcon name="star" size={30} color="#FFE86C" /> :
                                                <AntDesignIcon name="staro" size={30} color="#FFE86C" />
                                            }

                                        </View>
                                        {item.isShowing ?
                                            <View
                                                style={styles.listItem_description}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => _pageDetail(item)}
                                                >
                                                    <View
                                                        style={styles.listItem_action}
                                                    >
                                                        <AntDesignIcon name="eyeo" size={30} color="#000000" />
                                                        <Text
                                                            style={{
                                                                color: '#aaaaaa',
                                                                fontWeight: 'bold',
                                                                fontSize: 20
                                                            }}>
                                                            view
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        _removeItem(item.id)
                                                    }}
                                                >
                                                    <View style={styles.listItem_action}>
                                                        <AntDesignIcon name="delete" size={30} color="#000000" />
                                                        <Text
                                                            style={{
                                                                color: '#aaaaaa',
                                                                fontWeight: 'bold',
                                                                fontSize: 20
                                                            }}>
                                                            remove
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View> :
                                            <Text
                                                numberOfLines={2}
                                                style={{
                                                    color: '#aaaaaa',
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                    width: 400,
                                                    textAlign: 'justify'
                                                }}>
                                                {item.description}
                                            </Text>
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor={item => item.id}
                />
            </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
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
    appbar_icon: {
        position: 'absolute',
        right: 20,
        bottom: 10
    },
    backgroundStyle: {
        backgroundColor: '#dddddd',
        height: '100%',
        width: '100%',
        paddingHorizontal: 10
    },
    count_action: {
        marginHorizontal: 20,
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    count: {
        fontWeight: '500',
        color: '#000000',
        fontSize: 30,
    },
    actions: {

    },
    listItem: {
        borderBottomColor: '#aaaaaa',
        borderBottomWidth: 1,
        paddingVertical: 15
    },
    listItem_selected: {
        borderBottomColor: '#aaaaaa',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        paddingVertical: 15
    },
    nameWrapper: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: 23,
    },
    listItem_description: {
        display: 'flex',
        flexDirection: 'row',
        gap: 150,
        paddingHorizontal: 10,
        marginTop: 5
    },
    listItem_action: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
});

export default Home;