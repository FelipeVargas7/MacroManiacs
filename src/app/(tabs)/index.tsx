import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface Message {
  id: string;
  sender?: string;
  text: string;
  time: string;
  isMe: boolean;
  avatar?: string;
  isAchievement?: boolean;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80";

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "Oliver",
    text: "Bom dia time!\nVamos manter a sequência!",
    time: "6:30",
    isMe: false,
    avatar: DEFAULT_AVATAR,
  },
  {
    id: "2",
    sender: "Layla",
    text: "Bora! Já bati minhas metas de proteína💪",
    time: "6:50",
    isMe: false,
    avatar: DEFAULT_AVATAR,
  },
  {
    id: "3",
    sender: "Kauê",
    text: "Ontem não consegui, fechei no vermelho😭",
    time: "7:15",
    isMe: false,
    avatar: DEFAULT_AVATAR,
  },
  {
    id: "4",
    sender: "Você",
    text: "Não desista, melhore na próxima👊",
    time: "8:00",
    isMe: true,
  },
  {
    id: "5",
    sender: "Nicolly",
    text: "Alguém tem dica de refeição pós treino?🥗",
    time: "8:05",
    isMe: false,
    avatar: DEFAULT_AVATAR,
  },
  {
    id: "6",
    sender: "Henry",
    text: "Iogurte + whey + banana + aveia\nNunca falha👌",
    time: "8:40",
    isMe: false,
    avatar: DEFAULT_AVATAR,
  },
  {
    id: "7",
    sender: "Felipe",
    text: "Mais um dia fechado no verde🟢",
    time: "9:20",
    isMe: false,
    avatar: DEFAULT_AVATAR,
  },
  {
    id: "8",
    sender: "Rafael",
    text: "Ainda não consegui bater as minhas proteínas⚠️",
    time: "9:55",
    isMe: false,
    avatar: DEFAULT_AVATAR,
  },
  {
    id: "9",
    text: "Meta semanal de água concluída!\nGrupo ganhou +150 pontos!🎉",
    time: "10:00",
    isMe: false,
    isAchievement: true,
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("Chat");
  const [inputText, setInputText] = useState("");
  const [userAvatar, setUserAvatar] = useState<string>(DEFAULT_AVATAR);
  const [groupAvatar, setGroupAvatar] = useState<string>(DEFAULT_AVATAR);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  // Alterar foto do grupo
  const pickGroupAvatar = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso às suas fotos para trocar a imagem do grupo.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions?.Images ?? ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setGroupAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erro ao carregar imagem", String(error));
    }
  };

  // Alterar foto do usuário
  const pickUserAvatar = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso às suas fotos para trocar a sua imagem de perfil.",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions?.Images ?? ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setUserAvatar(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erro ao carregar imagem", String(error));
    }
  };

  // Enviar mensagem no chat
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const now = new Date();
    const formattedTime = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Você",
      text: inputText.trim(),
      time: formattedTime,
      isMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    if (item.isAchievement) {
      return (
        <View style={styles.achievementContainer}>
          <View style={styles.medalCircle}>
            <MaterialCommunityIcons
              name="medal-outline"
              size={26}
              color="#6D28D9"
            />
          </View>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.achievementText}>{item.text}</Text>
          </View>
          <Text style={styles.achievementTime}>{item.time}</Text>
        </View>
      );
    }

    if (item.isMe) {
      return (
        <View style={styles.myMessageRow}>
          <View style={[styles.bubble, styles.myBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={pickUserAvatar}>
            <Image source={{ uri: userAvatar }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.otherMessageRow}>
        <Image
          source={{ uri: item.avatar || DEFAULT_AVATAR }}
          style={styles.avatar}
        />
        <View style={[styles.bubble, styles.otherBubble]}>
          <View style={styles.otherBubbleHeader}>
            <Text style={styles.senderName}>{item.sender}</Text>
            <Text style={styles.messageTime}>{item.time}</Text>
          </View>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header Superior */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.headerLeftButton}>
          <Ionicons name="chevron-back" size={24} color="#111827" />
          <Text style={styles.headerTitle}>Grupos</Text>
        </TouchableOpacity>
        <View style={styles.headerRightActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="moon" size={20} color="#4B5563" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="settings" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {/* Card do Grupo com toque explícito para troca de imagem */}
              <View style={styles.groupCard}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={pickGroupAvatar}
                  style={styles.avatarTouchable}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Image
                    source={{ uri: groupAvatar }}
                    style={styles.groupAvatar}
                  />
                  <View style={styles.editBadge}>
                    <Ionicons name="camera" size={12} color="#FFFFFF" />
                  </View>
                </TouchableOpacity>

                <View style={styles.groupInfo}>
                  <Text style={styles.groupTitle}>Os cara do TI</Text>
                  <Text style={styles.groupMembers}>9 membros</Text>
                  <Text style={styles.groupTagline} numberOfLines={2}>
                    Onde os fracos não tem vez.
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={pickGroupAvatar}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="chevron-forward" size={20} color="#4B5563" />
                </TouchableOpacity>
              </View>

              {/* Abas */}
              <View style={styles.tabsRow}>
                {["Ranking", "Chat", "Metas", "Sobre"].map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <TouchableOpacity
                      key={tab}
                      onPress={() => setActiveTab(tab)}
                      style={[styles.tabItem, isActive && styles.activeTabItem]}
                    >
                      <Text
                        style={[
                          styles.tabText,
                          isActive
                            ? styles.activeTabText
                            : styles.inactiveTabText,
                        ]}
                      >
                        {tab}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Badge de Data */}
              <View style={styles.dateBadgeContainer}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>Hoje</Text>
                </View>
              </View>
            </>
          }
        />

        {/* Barra Inferior de Entrada de Texto */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.attachButton}
            onPress={pickUserAvatar}
          >
            <Feather name="paperclip" size={20} color="#6B7280" />
          </TouchableOpacity>

          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Mensagem..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
          </View>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Ionicons
              name="send"
              size={17}
              color="#FFFFFF"
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Navegação Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={22} color="#6B7280" />
          <Text style={styles.navLabel}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons
            name="clock-time-four-outline"
            size={22}
            color="#6B7280"
          />
          <Text style={styles.navLabel}>Refeições</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Feather name="users" size={22} color="#6B7280" />
          <Text style={styles.navLabel}>Grupo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={pickUserAvatar}>
          <View style={styles.activeProfileIndicator}>
            <Feather name="user" size={20} color="#6D28D9" />
          </View>
          <Text
            style={[styles.navLabel, { color: "#6D28D9", fontWeight: "600" }]}
          >
            Perfil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerLeftButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginLeft: 4,
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  groupCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 16,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  avatarTouchable: {
    position: "relative",
    width: 56,
    height: 56,
  },
  groupAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#6D28D9",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  groupInfo: {
    flex: 1,
    marginLeft: 14,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  groupMembers: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 1,
  },
  groupTagline: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 4,
  },
  arrowButton: {
    padding: 8,
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 4,
  },
  tabItem: {
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#6D28D9",
  },
  tabText: {
    fontSize: 15,
  },
  activeTabText: {
    color: "#6D28D9",
    fontWeight: "700",
  },
  inactiveTabText: {
    color: "#6B7280",
    fontWeight: "500",
  },
  dateBadgeContainer: {
    alignItems: "center",
    marginVertical: 14,
  },
  dateBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 11,
    color: "#1F2937",
    fontWeight: "600",
  },
  otherMessageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  myMessageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  bubble: {
    maxWidth: "74%",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  otherBubble: {
    backgroundColor: "#F9FAFB",
    marginLeft: 10,
  },
  myBubble: {
    backgroundColor: "#DDD6FE",
    marginRight: 10,
  },
  otherBubbleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6D28D9",
    marginRight: 16,
  },
  messageText: {
    fontSize: 13,
    color: "#111827",
    lineHeight: 18,
  },
  messageTime: {
    fontSize: 10,
    color: "#6B7280",
    alignSelf: "flex-end",
    marginTop: 4,
  },
  achievementContainer: {
    backgroundColor: "#DDD6FE",
    borderRadius: 14,
    padding: 12,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  medalCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FDE047",
    borderWidth: 2,
    borderColor: "#4338CA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  achievementText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    lineHeight: 17,
  },
  achievementTime: {
    fontSize: 11,
    color: "#4B5563",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  attachButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  textInputWrapper: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 40,
    justifyContent: "center",
    marginHorizontal: 8,
  },
  textInput: {
    fontSize: 14,
    color: "#111827",
    padding: 0,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6D28D9",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 8 : 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  activeProfileIndicator: {
    backgroundColor: "#EDE9FE",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 3,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 10,
    color: "#6B7280",
    marginTop: 2,
  },
});
