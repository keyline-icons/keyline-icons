import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Martini({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M14.9533 12.0751L12.7333 14.4705C12.5441 14.6747 12.2783 14.7908 11.9999 14.7908C11.7214 14.7908 11.4556 14.6747 11.2664 14.4705L6.8268 9.6797C6.6555 9.4948 6.5603 9.2521 6.5603 9C6.5603 8.4477 7.008 8 7.5603 8L12 8L16.4397 8C16.992 8 17.4397 8.4477 17.4397 9C17.4397 9.2521 17.3445 9.4949 17.1732 9.6797ZM7 2L12 2L21.9999 2.0001C22.5522 2.0001 22.9999 2.4478 22.9999 3.0001C22.9999 3.2521 22.9047 3.4949 22.7334 3.6798L20.8801 5.6797C20.6909 5.8839 20.425 6 20.1466 6L18.2922 6L12 6L5.7078 6L3.8534 6C3.5749 6 3.3091 5.8839 3.1199 5.6797L1.2665 3.6797C1.0952 3.4948 1 3.2521 1 3C1 2.4477 1.4477 2 2 2Z" fill="currentColor" stroke="none"/>
      <path d="M12 13.7909L12 21M5 21L6 21L18 21L19 21"/>
    </svg>
  )
}
