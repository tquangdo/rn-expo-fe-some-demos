import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Alert,
} from "react-native";
// convert FROM [publishedAt: "2021-07-05T14:29:00Z",] TO [about 1 hour]
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function Article({ props_item }) {
    const { url, publishedAt, urlToImage, title } = props_item;
    const openLink = () => {

        // https://reactnative.dev/docs/linking
        Linking.canOpenURL(url).then((arg_is_supported) => {
            if (arg_is_supported) {
                Linking.openURL(url);
            } else {
                Alert.alert("Broken Link!");
            }
        });
    };

    const publishedFromNow = formatDistanceToNow(new Date(publishedAt));

    return (
        <View style={styles.article}>
            {/* Caching image for better performance: https://github.com/DylanVann/react-native-fast-image */}
            <Image source={{ uri: urlToImage }} style={styles.articleImage} />

            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={openLink}>
                    <Text style={styles.articleTitle} numberOfLines={3}>
                        {title}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.articlePublishedAt}>{publishedFromNow}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    article: {
        flexDirection: "row",
        paddingVertical: 15,
    },
    articleImage: {
        width: 150,
        height: 85,
        resizeMode: "contain",
        marginRight: 15,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    articleDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    articlePublishedAt: {
        fontSize: 14,
    },
})