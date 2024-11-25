import { StyleSheet, Image, View, TouchableOpacity, Text } from "react-native";

import { useCallback, useEffect, useRef } from "react";
import { Swiper, SwiperCardRefType } from "rn-swiper-list";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { data } from "@/constants/data";

type ActionButtonProps = TouchableOpacity["props"] & {
  onTap?: () => void;
};

// eslint-disable-next-line react/display-name
export const ActionButton = React.memo(
  ({ onTap, style, children, ...rest }: ActionButtonProps) => {
    return (
      <TouchableOpacity onPress={onTap} {...rest} style={style}>
        {children}
      </TouchableOpacity>
    );
    // eslint-disable-next-line prettier/prettier
  }
);

export default function TabOneScreen() {
  const ref = useRef<SwiperCardRefType>();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const [cardData, setCardData] = React.useState(data);

  useEffect(() => {
    setCardData(data);
  }, []);

  const RenderCard = useCallback(
    ({
      index,
      question,
      labelLeft,
    }: {
      index: number;
      question: string;
      labelLeft: string;
    }) => {
      const isActive = currentIndex === index;
      return (
        <View style={[styles.renderCardContainer]}>
          {isActive ? (
            <View style={{ backgroundColor: "pink", flex: 1 }}>
              <Text>{question}</Text>
            </View>
          ) : (
            <View style={styles.renderCardImage}>
              <Text>Sıradaki</Text>
            </View>
          )}

          <Text>{labelLeft}</Text>
        </View>
      );
    },
    [currentIndex]
  );
  const OverlayLabelRight = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "green",
          },
        ]}
      >
        <Text style={{ fontWeight: "700", fontSize: 32 }}>
          {data[currentIndex]?.labelRight}
        </Text>
      </View>
    );
  }, [currentIndex]);
  const OverlayLabelLeft = useCallback(() => {
    return (
      <View
        style={[
          styles.overlayLabelContainer,
          {
            backgroundColor: "red",
          },
        ]}
      >
        <Text style={{ fontWeight: "700", fontSize: 32 }}>
          {data[currentIndex]?.labelLeft}
        </Text>
      </View>
    );
  }, [currentIndex]);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Swiper
          ref={ref}
          cardStyle={styles.cardStyle}
          data={data}
          renderCard={(item, i) => {
            console.log("🚀 ~ TabOneScreen ~ i:", i);
            return <RenderCard {...item} index={i} />;
          }}
          onSwipeRight={(cardIndex) => {
            console.log("cardIndex", cardIndex);
            setCurrentIndex(cardIndex + 1);
          }}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          onSwipeLeft={(cardIndex) => {
            console.log("onSwipeLeft", cardIndex);
            setCurrentIndex(cardIndex + 1);
          }}
          disableTopSwipe
          onSwipeTop={(cardIndex) => {
            console.log("onSwipeTop", cardIndex);
          }}
          OverlayLabelRight={OverlayLabelRight}
          OverlayLabelLeft={OverlayLabelLeft}
          onSwipeActive={() => {
            console.log("onSwipeActive");
          }}
          onSwipeStart={() => {
            console.log("onSwipeStart");
          }}
          onSwipeEnd={() => {
            console.log("onSwipeEnd");
          }}
        />
      </View>

      {/* <View style={styles.buttonsContainer}>
        <ActionButton
          style={styles.button}
          onTap={() => {
            ref.current?.swipeLeft();
          }}
        >
          <AntDesign name="close" size={32} color="white" />
        </ActionButton>
        <ActionButton
          style={[styles.button, { height: 60, marginHorizontal: 10 }]}
          onTap={() => {
            ref.current?.swipeBack();
          }}
        >
          <AntDesign name="reload1" size={24} color="white" />
        </ActionButton>
        <ActionButton
          style={styles.button}
          onTap={() => {
            ref.current?.swipeTop();
          }}
        >
          <AntDesign name="arrowup" size={32} color="white" />
        </ActionButton>
        <ActionButton
          style={styles.button}
          onTap={() => {
            ref.current?.swipeRight();
          }}
        >
          <AntDesign name="heart" size={32} color="white" />
        </ActionButton>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    bottom: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 80,
    borderRadius: 40,
    marginHorizontal: 20,
    aspectRatio: 1,
    backgroundColor: "#3A3D45",
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardStyle: {
    width: "95%",
    height: "75%",
    borderRadius: 15,
    marginVertical: 20,
  },
  renderCardContainer: {
    flex: 1,
    borderRadius: 15,
    height: "75%",
    width: "100%",
  },
  renderCardImage: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
    backgroundColor: "gray",
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayLabelContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
