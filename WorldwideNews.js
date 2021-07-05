import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { uniqBy } from "lodash";
import { getNews } from "./components/ww-news/apis";
import Article from "./components/ww-news/Article";

const PAGE_SIZE = 20;
const PRIMARY_COLOR = "#e74c3c";

export default function WorldwideNews() {
  const [staIsLoading, setStaIsLoading] = useState(true);
  const [staArticles, setStaArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [staRefreshing, setStaRefreshing] = useState(false);
  const refHasMoreData = useRef(true);

  useEffect(() => {
    const onFetchData = async () => {
      if (!refHasMoreData.current) return;

      const newArticles = await getNews(page, PAGE_SIZE);

      if (newArticles.length < PAGE_SIZE) {
        refHasMoreData.current = false;
      }

      setStaArticles((arg_articles) => {
        // Combine and filter article has no image
        const allArticles = arg_articles.concat(
          newArticles.filter((arg_article) => arg_article.urlToImage)
        );

        // Remove duplicate articles
        // https://lodash.com/docs/4.17.15#uniqBy
        return uniqBy(allArticles, "url");
      });
      setStaIsLoading(false);
      setStaRefreshing(false);
    };

    onFetchData();
  }, [page]);

  const onRefreshData = () => {
    setPage(1);
    setStaRefreshing(true);
    setStaArticles([]);
    refHasMoreData.current = true;
  };

  const onRenderArticle = ({ item }) => <Article props_item={item} />;
  const onRenderDivider = () => <View style={styles.articleSeparator}></View>;
  const onRenderFooter = () => (
    <View style={styles.center}>
      {refHasMoreData.current && <ActivityIndicator color={PRIMARY_COLOR} />}
    </View>
  );
  const onKeyExtractor = (item) => item.url;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headlines}>Worldwide News</Text>
        <Text>Made by DoTQ</Text>
        <Text>{"\n"}</Text>
        {staIsLoading ? (
          <View style={styles.center}>
            {/* https://reactnative.dev/docs/activityindicator */}
            <ActivityIndicator size="large" color={PRIMARY_COLOR} />
          </View>
        ) : (
          // Optimizing FlatList: https://reactnative.dev/docs/optimizing-flatlist-configuration
          <FlatList
            data={staArticles}
            renderItem={onRenderArticle}
            keyExtractor={onKeyExtractor}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={onRenderDivider}
            ListFooterComponent={onRenderFooter}
            initialNumToRender={6}
            onEndReached={() => setPage((page) => page + 1)}
            onEndReachedThreshold={1}
            onRefresh={onRefreshData}
            refreshing={staRefreshing}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headlines: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 50,
    color: PRIMARY_COLOR,
  },
  articleSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ed7669",
  },
})