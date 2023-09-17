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
import * as DocumentPicker from "expo-document-picker";

export default function App() {
  const [zipFiles, setZipFiles] = useState([]);

  const pickAndZipFile = async () => {
    // First, pick a file using the document picker
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      // Get the first asset
      const firstAsset = result.assets[0];
      const pickedFilePath = firstAsset.uri;

      // Define paths and directories
      const directory = `${FileSystem.documentDirectory}rn-zip-poc/`;
      const zipPath = `${FileSystem.documentDirectory}${firstAsset.name}.zip`;

      // Create a directory for zipping
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      // Copy the picked file to the new directory
      const newFilePath = `${directory}${firstAsset.name}`;
      await FileSystem.copyAsync({
        from: pickedFilePath,
        to: newFilePath,
      });

      // Zip the file
      try {
        await zip(directory, zipPath);
        console.log(`Zipped file is at: ${zipPath}`);
        await listZipFiles();
      } catch (error) {
        console.error("An error occurred:", error);
      }
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
      <Text>Press the button to pick and zip a file!</Text>
      <Button title="Pick and Zip File" onPress={pickAndZipFile} />

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
