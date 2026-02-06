import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";

export function getAvatarDataUri(seed: string) {
  return createAvatar(shapes, {
    seed,
    size: 96,
    backgroundColor: ["b6e3f4", "c0aede", "ffd5dc", "d1d4f9"],
  }).toDataUri();
}
