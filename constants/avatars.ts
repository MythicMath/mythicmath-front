export const avatars = {
  vampire: require("@/assets/avatars/vampire.jpg"),
  dragon: require("@/assets/avatars/dragon.jpg"),
  dwarf: require("@/assets/avatars/dwarf.jpg"),
  mage: require("@/assets/avatars/mage.jpg"),
  elf: require("@/assets/avatars/elf.jpg"),
  mermaid: require("@/assets/avatars/mermaid.jpg"),
  necromancer: require("@/assets/avatars/necromancer.jpg"),
  angelic_paladin: require("@/assets/avatars/angelic_paladin.jpg"),
  phoenix: require("@/assets/avatars/phoenix.jpg"),
};

export type AvatarKey = keyof typeof avatars;