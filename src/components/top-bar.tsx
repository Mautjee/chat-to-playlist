import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { useGlobalStore } from "@/store";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { type Stages } from "@/types/stages";

export const TopBar = () => {
  const { data: sessionData } = useSession();
  const setStage = useGlobalStore((state) => state.setStage);

  const handleMenuClick = (stage: Stages) => {
    setStage(stage);
  };

  return (
    <div className="flex w-full flex-row items-center justify-between ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            onClick={() => handleMenuClick("upload")}
          >
            Chat to playlist
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      ,
      {sessionData ? (
        <Button onClick={() => void signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => void signIn()}>Sign in</Button>
      )}
    </div>
  );
};
