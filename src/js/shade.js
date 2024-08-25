export const shade = (color, darkness) =>  `hwb(${color.h - darkness / 2} ${color.w - darkness} ${color.b + darkness})`;
