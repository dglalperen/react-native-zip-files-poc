import React, { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Share,
  SafeAreaView,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { zip } from "react-native-zip-archive";

export default function App() {
  const [zipFiles, setZipFiles] = useState([]);

  const zipSampleFiles = async () => {
    const directory = `${FileSystem.documentDirectory}sampleDirectory/`;
    const filePath = `${directory}sampleFile.txt`;
    const zipPath = `${FileSystem.documentDirectory}sample.zip`;

    try {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      await FileSystem.writeAsStringAsync(filePath, "This is sample text.");
      await zip(directory, zipPath);
      console.log(`Zipped file is at: ${zipPath}`);
      await listZipFiles();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const listZipFiles = async () => {
    try {
      const directoryContent = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );
      const zips = directoryContent.filter((name) => name.endsWith(".zip"));
      setZipFiles(zips);
    } catch (error) {
      console.error("An error occurred while listing:", error);
    }
  };

  const shareFile = async (fileName) => {
    const fullPath = `${FileSystem.documentDirectory}${fileName}`;
    try {
      await Share.share({
        url: fullPath,
      });
    } catch (error) {
      console.error("An error occurred while sharing:", error);
    }
  };

  useEffect(() => {
    listZipFiles();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Press the button to create and zip a sample file!</Text>
      <Button title="Zip Sample File" onPress={zipSampleFiles} />

      <Text>List of Zip Files:</Text>
      <FlatList
        data={zipFiles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => shareFile(item)}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "black",
              margin: 5,
            }}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
});
