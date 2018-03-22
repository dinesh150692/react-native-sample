#!/bin/bash
echo "Creating project without FaceDetector"
if [ -e node_modules/react-native-camera/ios/FaceDetector ] ; then
  rm -rf node_modules/react-native-camera/ios/FaceDetector
fi
cp node_modules/react-native-camera/postinstall_project/projectWithoutFaceDetection.pbxproj node_modules/react-native-camera/ios/RNCamera.xcodeproj/project.pbxproj
cp ./node_modules/react-navigation/src/PlatformHelpers.web.js ./node_modules/react-navigation/src/PlatformHelpers.js
rm node_modules/react-native/local-cli/core/__fixtures__/files/package.json