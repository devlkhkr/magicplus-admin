import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const routeState = atom({
  key: "routeHistory",
  default: ["/"],
  effects_UNSTABLE: [persistAtom],
});
