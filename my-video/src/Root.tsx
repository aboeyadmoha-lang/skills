import { Composition, Folder } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { Logo } from "./HelloWorld/Logo";
import { Title } from "./HelloWorld/Title";
import { RayhanPromo } from "./Rayhan/RayhanPromo";
import { AssabLaunch } from "./Assab/AssabLaunch";
import { EndOfDay } from "./Assab/EndOfDay/EndOfDay";
import { WhatHappened } from "./Assab/Note/WhatHappened";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Elements">
        <Composition
          id="Logo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="Title"
          component={Title}
          durationInFrames={115}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#000000",
          }}
        />
      </Folder>
      <Composition
        // You can take the "id" to render a video:
        // bunx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
        }}
      />
      <Composition
        id="RayhanPromo"
        component={RayhanPromo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AssabLaunch"
        component={AssabLaunch}
        durationInFrames={1023}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AssabEndOfDay"
        component={EndOfDay}
        durationInFrames={783}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AssabWhatHappened"
        component={WhatHappened}
        durationInFrames={915}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
