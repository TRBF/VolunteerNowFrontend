import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import GestureRecognizer from "react-native-swipe-gestures";
import { Link } from "expo-router";
import { url_endpoint } from "../apistuff/_config";
import { verticalUnits } from "../jmecheriis/ddunits";
import { styles } from "../styles/index";
import { Comment } from "../components/indexcomment";

export function Post({ postObject }: any) {
  const [shareClicked, setShareClicked] = useState(false);
  const [heartClicked, setHeartClicked] = useState(false);
  const [commentClicked, setCommentClicked] = useState(false);
  const [visible, setVisible] = useState(true);

  const usersComment = [
    {
      pfp: "pfp1",
      username: "Darius",
      text: "Foarte Fain, imi place foarte mult aaaaaaaaaaaaaaaaaaaaaa",
    },
    {
      pfp: "pfp2",
      username: "JonSnow",
      text: "Foarte Naspa lala lala lala lala lala lala",
    },
    { pfp: "pfp3", username: "CineSunt", text: "Foarte Indiferent" },
    { pfp: "pfp4", username: "CineSunt", text: "Foarte Indiferent" },
    { pfp: "pfp5", username: "CineSunt", text: "Foarte Indiferent" },
    { pfp: "pfp6", username: "CineSunt", text: "Foarte Indiferent" },
    { pfp: "pfp7", username: "CineSunt", text: "Foarte Indiferent" },
    { pfp: "pfp8", username: "CineSunt", text: "Foarte Indiferent" },
    { pfp: "pfp9", username: "CineSunt", text: "Foarte Indiferent" },
    { pfp: "pfp10", username: "CineSunt", text: "Foarte Indiferent" },
    { pfp: "pfp11", username: "CineSunt", text: "Foarte Indiferent" },
  ];

  return (
    <View style={[{ marginBottom: verticalUnits(2) }, styles.post]}>
      <View style={{ width: "12%", aspectRatio: 1, marginRight: "4%" }}>
        <Link
          href={{
            pathname: "entities/org/[id]",
            params: { username: postObject.author },
          }}
          asChild
        >
          <Pressable style={{ width: "100%", aspectRatio: 1 }}>
            <Image
              source={{
                uri: url_endpoint + "/api" + postObject.profile_picture,
              }}
              style={{ height: "100%", borderRadius: 1000 }}
              contentFit="cover"
            />
          </Pressable>
        </Link>
      </View>
      <Link
        href={{
          pathname: "entities/posts/[id]",
          params: { id: postObject.id },
        }}
        asChild
      >
        <Pressable style={{ width: "100%", height: "100%" }}>
          <View style={styles.postInfo}>
            <View style={styles.creationData}>
              <View style={styles.authorData}>
                  <Text style={styles.authorName}>{postObject.name}</Text>
                  <Text style={styles.authorUsername}>{postObject.location}</Text>
              </View>
            </View>

            <Text style={styles.postContent}>
              {postObject.description.length > 300
                ? postObject.description.substring(0, 150) + "..."
                : postObject.description}
            </Text>

            <View
              style={{
                width: "100%",
                aspectRatio: 1,
                marginTop: verticalUnits(2),
                marginBottom: verticalUnits(2),
              }}
            >
              <Image
                source={{ uri: url_endpoint + "/api" + postObject.post_image }}
                style={styles.featureImage}
                contentFit="cover"
              />
            </View>
            <View style={styles.bottomSection}>
              <View style={styles.rightButtons}>
              {/*
                <Pressable
                  style={{ flexDirection: "row" }}
                  onPress={() => setHeartClicked(!heartClicked)}
                >
                  <FontAwesome
                    name={heartClicked ? "heart" : "heart-o"}
                    style={[
                      {
                        color: heartClicked ? "#7211A2" : "#9394a5",
                        marginRight: "5%",
                      },
                      styles.icon,
                    ]}
                  />
                  <Text
                    style={{
                      color: heartClicked ? "#7211A2" : "#9394a5",
                      textAlignVertical: "center",
                    }}
                  >
                    {postObject.like_count} 
                  </Text>
                </Pressable>
                <Pressable
                  style={{ flexDirection: "row" }}
                  onPress={() => setCommentClicked(!commentClicked)}
                >
                  <FontAwesome
                    name={"comment-o"}
                    style={[
                      { color: "#9394a5", marginRight: "5%" },
                      styles.icon,
                    ]}
                  />
                  <Text
                    style={{
                      color: heartClicked ? "#7211A2" : "#9394a5",
                      textAlignVertical: "center",
                    }}
                  >
                    123
                  </Text>
                </Pressable>
                {/*<Pressable onPress={() => setShareClicked(!shareClicked)}>
                  <FontAwesome
                    name={shareClicked ? "send" : "send-o"}
                    style={[{ color: "#9394a5" }, styles.icon]}
                  />
                </Pressable>}
                */}
              </View>
              <Text style={styles.volunteersNeeded}>
                {" "}
                150 volunteers needed
              </Text>
            </View>
          </View>
        </Pressable>
      </Link>
      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={() => {
          setCommentClicked(false);
        }}
      >
        <Modal
          animationType="slide"
          visible={commentClicked}
          transparent={true}
          onRequestClose={() => {
            setVisible(!commentClicked);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  width: "14%",
                  height: verticalUnits(0.8),
                  backgroundColor: "#dedede",
                  borderRadius: 50,
                  marginBottom: verticalUnits(1),
                }}
              ></View>
              <Text style={styles.modalText}>Comments</Text>
            </View>
            <ScrollView>
              {usersComment.map((comment, index) => (
                <Comment
                  key={index}
                  pfp={comment.pfp}
                  username={comment.username}
                  text={comment.text}
                />
              ))}
            </ScrollView>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "94%",
                margin: "auto",
                paddingVertical: "1%",
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderTopColor: "#eeeeee",
                borderBottomColor: "#eeeeee",
              }}
            >
              <View style={{ width: "12%" }}>
                <Image
                  source={{
                    uri: "https://via.placeholder.com/40x40/000000/000000",
                  }}
                  style={{ aspectRatio: 1, width: "100%", borderRadius: 40 }}
                />
              </View>
              <TextInput
                placeholder="Add comment..."
                style={[
                  styles.commentInput,
                  { height: verticalUnits(5), width: "80%" },
                ]}
                returnKeyType="send"
              />
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
    </View>
  );
}
