export type RootStackParamList = {
    Home: undefined;
    Detail: {id: string, name: string, description: string, favor: boolean, avatar: string};
    Create: undefined;
};

export type ItemType = {
    id: string,
    name: string,
    description: string,
    favor: boolean,
    avatar: string
}