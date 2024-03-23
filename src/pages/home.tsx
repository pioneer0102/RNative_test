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
    TouchableHighlight
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
import { ImageSourcePropType } from 'react-native';
import { itemType } from '../types/types';

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

const data: itemType[] = [
    {
        id: '1',
        name: 'My Refrigerator',
        description: 'The sleek and modern design of our new smart refrigerator will revolutionize the way you experience your kitchen. With advanced features like voice control and a built-in camera for easy inventory management, this appliance is not only stylish but also incredibly functional, Say goodbye to food waste with real-time notifications and personalized mean suggestion based on your inventory. Upgrade your kitchen with this cutting-edge applicance and enjoy a seamless cooking experience like never before.',
        favor: false,
        avatar: '../../assets/img/fridge.png'
    },
    {
        id: '2',
        name: 'Appliance 2',
        description: 'The sleek and modern design of our new smart refrigerator will revolutionize the way you experience your kitchen. With advanced features like voice control and a built-in camera for easy inventory management, this appliance is not only stylish but also incredibly functional, Say goodbye to food waste with real-time notifications and personalized mean suggestion based on your inventory. Upgrade your kitchen with this cutting-edge applicance and enjoy a seamless cooking experience like never before.',
        favor: false,
        avatar: '../../assets/img/fridge.png'
    },
    {
        id: '3',
        name: 'Appliance 3',
        description: 'The sleek and modern design of our new smart refrigerator will revolutionize the way you experience your kitchen. With advanced features like voice control and a built-in camera for easy inventory management, this appliance is not only stylish but also incredibly functional, Say goodbye to food waste with real-time notifications and personalized mean suggestion based on your inventory. Upgrade your kitchen with this cutting-edge applicance and enjoy a seamless cooking experience like never before.',
        favor: false,
        avatar: '../../assets/img/fridge.png'
    }
];

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const [showingArray, setShowingArray] = useState<showingType[]>([]);

    useEffect(() => {
        var temp: showingType[] = [];
        data.map((item) => {
            temp.push({
                id: item.id,
                name: item.name,
                description: item.description,
                favor: item.favor,
                avatar: item.avatar,
                isShowing: false
            });
            setShowingArray(temp);
        })
    }, []);

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

    const _viewDetail = (item: showingType) => {
        navigation.navigate('Detail', {
            id: item.id,
            name: item.name,
            description: item.description,
            favor: item.favor,
            avatar: item.avatar
        })
    }

    const _removeItem = (id: string) => {
        setShowingArray(prev => prev.filter(item => item.id !== id)) 
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
                <FontAwesomeIcon style={styles.appbar_icon} name="plus" size={30} color="#ffffff" />
            </View>
            {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"> */}
            <View style={styles.backgroundStyle}>
                <View style={styles.count_action}>
                    <Text style={styles.count}>
                        Appliance: {data.length}
                    </Text>
                    <View style={styles.actions}>

                    </View>
                </View>
                <FlatList
                    data={showingArray}
                    renderItem={({ item }) =>
                        <TouchableHighlight key={item.id} onPress={() => _onPressListItem(item.id)}>
                            <View style={styles.listItem}>
                                <View style={{ display: 'flex', flexDirection: 'row', gap: 20, marginLeft: 15 }}>
                                    <Image source={require('../../assets/img/fridge.png')} alt="Gradient" style={{ width: 130, height: 100 }} />
                                    <View>
                                        <Text
                                            style={{
                                                color: '#333333',
                                                fontWeight: 'bold',
                                                fontSize: 23,
                                                marginBottom: 10
                                            }}>
                                            {item.name}
                                        </Text>
                                        {item.isShowing ?
                                            <View
                                                style={styles.listItem_description}
                                            >
                                                <TouchableHighlight
                                                    onPress={() => _viewDetail(item)}
                                                >
                                                    <View
                                                        style={styles.listItem_action}
                                                    >
                                                        <AntDesignIcon name="eyeo" size={30} color="#000000" />
                                                        {/* <Icon style={styles.appbar_icon} name="plus" size={30} color="#ffffff" /> */}
                                                        <Text
                                                            style={{
                                                                color: '#aaaaaa',
                                                                fontWeight: 'bold',
                                                                fontSize: 20
                                                            }}>
                                                            view
                                                        </Text>
                                                    </View>
                                                </TouchableHighlight>
                                                <TouchableHighlight
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
                                                </TouchableHighlight>
                                            </View> :
                                            <Text
                                                numberOfLines={2}
                                                style={{
                                                    color: '#aaaaaa',
                                                    fontWeight: 'bold',
                                                    fontSize: 20,
                                                    width: 400
                                                }}>
                                                {item.description}
                                            </Text>
                                        }
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
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
        marginHorizontal: 30,
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
    listItem_description: {
        display: 'flex',
        flexDirection: 'row',
        gap: 100,
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