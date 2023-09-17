# React Native Zip and Share Proof-of-Concept

## Overview

This is a simple React Native application demonstrating how to zip files and then display the list of zip files. The user can pick a file, zip it, and view the available zip files.

## Technologies Used

- React Native
- Expo
- Expo File System
- react-native-zip-archive

## Features

- Pick a file from the device storage
- Zip the picked file
- List the available zip files on the device
- Share the zip file

## How to Run

1. Clone the repository
2. Navigate to the project directory
3. Run `npm install` or `yarn install` to install dependencies
4. Run `npx expo start` to start the Expo development server

## Create Development Build using EAS

The project uses Expo Application Services (EAS) for build and submission. To create a development build using EAS, follow these steps:

### Prerequisites

- Make sure EAS CLI is installed. If not, run `npm install -g eas-cli`
- Your `eas.json` should look like the one below:

```json
{
  "cli": {
    "version": ">= 5.2.0",
    "promptToConfigurePushNotifications": false
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### Steps

1. Log in to your Expo account using `eas login`.
2. Run `eas build --profile development` to create a development build.
3. Once the build is complete, you can install the development build on your device using the provided link.
