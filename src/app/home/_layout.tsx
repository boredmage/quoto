import { TabList, TabSlot, Tabs, TabTrigger } from "expo-router/ui";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TabButton } from "../../components/TabButton";
import {
  BookmarkIcon,
  DiscoverIcon,
  HomeIcon,
  UserIcon,
} from "../../components/icons";
import { Colors } from "../../constants/colors";

export default function HomeTabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.bar, { paddingBottom: insets.bottom + 8 }]}>
        <TabTrigger name="home" href="/home" asChild>
          <TabButton icon={HomeIcon} label="Home" />
        </TabTrigger>
        <TabTrigger name="discover" href="/home/discover" asChild>
          <TabButton icon={DiscoverIcon} label="Discover" />
        </TabTrigger>
        <TabTrigger name="library" href="/home/library" asChild>
          <TabButton icon={BookmarkIcon} label="Library" />
        </TabTrigger>
        <TabTrigger name="profile" href="/home/profile" asChild>
          <TabButton icon={UserIcon} label="Profile" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderTopWidth: 1.5,
    borderTopColor: Colors.onSurface,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
