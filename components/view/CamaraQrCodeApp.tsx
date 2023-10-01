import { BarCodeScanner } from "expo-barcode-scanner";
import { PermissionResponse } from "expo-camera"
import { View, Text, StyleSheet } from "react-native";
import { BarCodeScannedType } from "../../constant/type/event-utils";

type CamaraAppProps = {
    permission: PermissionResponse | null
    handleBarCodeScanned: ({ type, data }: BarCodeScannedType) => void
}
const CamaraQrCodeApp = ({ permission, handleBarCodeScanned }: CamaraAppProps) => {
    if (permission?.status === 'granted') {
        return <View style={styles.cameraContainer}>
            <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={styles.camera} />
        </View>
    }

    if (permission?.status === 'denied') {
        return (
            <View style={styles.camera}>
                <Text>Camera permission not granted</Text>
            </View>
        );
    }

    return <View style={styles.camera}>
        <Text>Camera Loading...</Text>
    </View>;
}

export default CamaraQrCodeApp

const styles = StyleSheet.create({
    camera: {
        flex: 1
    },
    cameraContainer: {
        width: '100%',
        aspectRatio: 1,
    },
});