import { PATH } from "../constants";

export const navHiddenPath = [
  PATH.login,
  `${PATH.vton.root}/*`,
  `${PATH.clothes.detail.replace(":id", "*")}`,
];
