import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Animated,
  Alert,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Audio } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import LiveAudioStream from "react-native-live-audio-stream";
import { Buffer } from "buffer";
import { ActivityIndicator } from "react-native";

const { width } = Dimensions.get("window");

// --- CONSTANTS ---
// IMPORTANT: Use your computer's local IP address (e.g., 192.168.1.5)
// const BACKEND_IP = "192.168.1.1";
// const WS_URL = `ws://${BACKEND_IP}:8000/ws`;
// const UPLOAD_URL = `http://${BACKEND_IP}:8000/upload`;

export default function Home() {
  const [activeTab, setActiveTab] = useState("live");
  const [ip, setIp] = useState("");
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Ready");
  const [isUploading, setIsUploading] = useState(false);
  const [welcomepopupHidden, setWelcomepopupHidden] = useState(true);
  const [popupHidden, setPopupHidden] = useState(false);

  const WS_URL = `ws://${ip}:8000/ws`;
  const UPLOAD_URL = `http://${ip}:8000/upload`;
  const socketRef = useRef(null);
  const scrollViewRef = useRef();

  // --- AUDIO INITIALIZATION ---
  useEffect(() => {
    const options = {
      sampleRate: 16000, // Standard for speech recognition
      channels: 1, // Mono
      bitsPerSample: 16, // 16-bit PCM
      bufferSize: 4096,
    };
    LiveAudioStream.init(options);

    LiveAudioStream.on("data", (data) => {
      // 'data' comes as a base64 string from the native side
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        const chunk = Buffer.from(data, "base64");
        socketRef.current.send(chunk);
      }
    });

    return () => {
      LiveAudioStream.stop();
      socketRef.current?.close();
    };
  }, []);

  // --- STREAMING LOGIC ---
  const startStreaming = async () => {
    try {
      const { status: perm } = await Audio.requestPermissionsAsync();
      if (perm !== "granted")
        return Alert.alert("Permission", "Mic access is required");

      setStatus("Connecting...");
      socketRef.current = new WebSocket(WS_URL);

      socketRef.current.onopen = () => {
        setStatus("Listening...");
        setIsRecording(true);
        LiveAudioStream.start();
      };

      socketRef.current.onmessage = (e) => {
        setText((prev) => prev + " " + e.data);
      };

      socketRef.current.onerror = (e) => {
        setStatus("Connection Error");
        console.error(e);
      };

      socketRef.current.onclose = () => stopStreaming();
    } catch (err) {
      Alert.alert("Error", "Could not start live stream");
    }
  };

  const stopStreaming = () => {
    LiveAudioStream.stop();
    setIsRecording(false);
    setStatus("Ready");
    socketRef.current?.close();
  };

  // --- FILE UPLOAD LOGIC ---
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "audio/*" });
      if (result.canceled) return;

      setIsUploading(true);
      setStatus("Uploading...");

      const asset = result.assets[0];
      const formData = new FormData();
      formData.append("file", {
        uri: asset.uri,
        name: asset.name,
        type: asset.mimeType || "audio/mpeg",
      });

      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const data = await res.json();
      setText(data.text);
      setStatus("Analysis Complete");
    } catch (err) {
      Alert.alert("Upload Failed", "Check if backend is running");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Live Transcription</Text>
        <Text style={styles.subtitle}>Physical Device Stream</Text>
      </View>

      {/* MODE SWITCHER */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab("live")}
          style={[styles.tab, activeTab === "live" && styles.activeLiveTab]}
        >
          <Text style={styles.tabText}>Live Mic 🎙️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("upload")}
          style={[styles.tab, activeTab === "upload" && styles.activeUploadTab]}
        >
          <Text style={styles.tabText}>Upload File 📁</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN CARD */}
      <View style={styles.card}>
        <View style={styles.statusBar}>
          <View style={styles.statusLeft}>
            <View
              style={[
                styles.indicator,
                { backgroundColor: isRecording ? "#22c55e" : "#ef4444" },
              ]}
            />
            <Text style={styles.statusText}>{status.toUpperCase()}</Text>
          </View>
          <TouchableOpacity onPress={() => setText("")}>
            <Text style={styles.clearText}>CLEAR</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.textArea}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {text ? (
            <Text style={styles.transcriptionText}>{text}</Text>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Waiting for audio...</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* ACTION BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={
            activeTab === "live"
              ? isRecording
                ? stopStreaming
                : startStreaming
              : handleFileUpload
          }
          disabled={isUploading}
          style={[
            styles.mainButton,
            activeTab === "live"
              ? isRecording
                ? styles.stopBtn
                : styles.startBtn
              : styles.uploadBtn,
          ]}
        >
          <Text style={styles.buttonText}>
            {activeTab === "live"
              ? isRecording
                ? "Stop Recording"
                : "Start Recording"
              : isUploading
              ? "Analyzing..."
              : "Choose Audio File"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={welcomepopupHidden} transparent={true}>
        <View style={styles.welcomeModal}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: "400",
              color: "white",
              textAlign: "center",
            }}
          >
            Fundamentals of Machine Learning Project
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              color: "white",
              textAlign: "center",
              position: 'absolute',
              bottom: 110,
              right: 29
            }}
          >
            Submitted to: Alemwork
          </Text>
        
          <TouchableOpacity
            onPress={() => {setWelcomepopupHidden(false),setPopupHidden(true)}}
            style={styles.getStartedButton}
          >
            <Text style={{ fontSize: 17 }}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={popupHidden} transparent={true}>
        <View style={styles.modal}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "400",
              color: "white",
              textAlign: "center",
            }}
          >
            Please Enter The Ip Adress of the Computer which the backend is
            running
          </Text>
          <TextInput
            placeholderTextColor={"#1e293b"}
            style={{
              fontSize: 15,
              fontWeight: "400",
              color: "#1e293b",
              borderWidth: 1,
              borderRadius: 20,
              paddingVertical: 15,
              paddingHorizontal: 10,
              width: "100%",
              marginTop: 20,
              marginBottom: 20,
              backgroundColor: "white",
              textAlign: "center",
            }}
            placeholder="Enter The Ip Address of your computer"
            onChangeText={setIp}
          ></TextInput>
          <TouchableOpacity
            onPress={() => setPopupHidden(false)}
            style={styles.button}
          >
            <Text style={{ fontSize: 17 }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    paddingVertical: 20,
  },
  header: { alignItems: "center", marginBottom: 20 },
  title: { fontSize: 28, marginTop: 12, fontWeight: "900", color: "#60a5fa" },
  subtitle: { color: "#94a3b8", fontSize: 14 },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#1e293b",
    padding: 5,
    borderRadius: 50,
    marginBottom: 20,
  },
  tab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 25 },
  activeLiveTab: { backgroundColor: "#2563eb" },
  activeUploadTab: { backgroundColor: "#9333ea" },
  tabText: { color: "white", fontWeight: "bold" },
  card: {
    width: width * 0.9,
    height: 400,
    backgroundColor: "#1e293b",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#020617",
  },
  statusLeft: { flexDirection: "row", alignItems: "center" },
  indicator: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  statusText: { color: "#93c5fd", fontSize: 12, fontWeight: "bold" },
  clearText: { color: "#64748b", fontSize: 11, fontWeight: "bold" },
  textArea: { flex: 1, padding: 20 },
  transcriptionText: { color: "#f1f5f9", fontSize: 18, lineHeight: 28 },
  emptyContainer: {
    flex: 1,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: { color: "#475569", fontSize: 20, fontStyle: "italic" },
  buttonContainer: { marginTop: 30 },
  mainButton: { paddingHorizontal: 40, paddingVertical: 18, borderRadius: 50 },
  startBtn: { backgroundColor: "#2563eb" },
  stopBtn: { backgroundColor: "#dc2626" },
  uploadBtn: { backgroundColor: "#9333ea" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  modal: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    // justifyContent: "center",
    // paddingVertical: 40,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  welcomeModal: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    // justifyContent: "center",
    // paddingVertical: 40,
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  button: {
    // backgroundColor: "#f0ff20ff",
    backgroundColor: "#93c5fd",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 20,
  },
  getStartedButton: {
    backgroundColor: "#93c5fd",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 20,
    position: 'absolute',
    bottom: 50
  },
});
