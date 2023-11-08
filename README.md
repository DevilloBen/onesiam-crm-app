# onesiam-crm-app

eas build -p android --profile android-apk
eas build -p android --profile production

# onesiam-crm-app

eas build -p ios --profile preview
npx expo prebuild --platform ios

eas update

eas build --platform ios -expo build:status-profile ios-ipa
