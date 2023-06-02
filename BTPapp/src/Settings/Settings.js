import React from 'react';
import { Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Settings = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
            padding: 30,
        }}>
            <View style={{
                borderRadius: 50,
                borderColor: '#FFF',
                backgroundColor: '#FFF',
                width: 80,
                height: 80,
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }} >
                <MaterialCommunityIcons name="account-circle-outline" color="#000" size={80} />
            </View>
            <View style={{ width: 20 }} />
            <View>
                <Text style={{
                    color: '#007CC9',
                    fontSize: 18,
                    fontWeight: 700,
                }}>
                    Chandan Shrivastava
                </Text>
                <View style={{ height: 5 }} />
                <Text style={{
                    color: '#414042',
                    fontSize: 14,
                    fontWeight: 400,
                    width: 200,
                }} numberOfLines={1}>
                    chandan.shrivastava@students.iiit.ac.in
                </Text>
                <View style={{ height: 5 }} />
                <Text style={{
                    color: '#676668',
                    fontSize: 12,
                    fontWeight: 400,
                }}>
                    +91 7488848336
                </Text>
            </View>
        </View>
    );
}

export default Settings;