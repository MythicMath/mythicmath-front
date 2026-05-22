export const avatars = {
  vampire: require("@/assets/avatars/vampire.jpg"),
  dragon: require("@/assets/avatars/dragon.jpg"),
  dwarf: require("@/assets/avatars/dwarf.jpg"),
  mage: require("@/assets/avatars/mage.jpg"),
  elf: require("@/assets/avatars/elf.jpg"),
};

export type AvatarKey = keyof typeof avatars;
