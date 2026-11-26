import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceStarEyes({ size = 24, ...props }: IconProps) {
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
      <path d="M21.5603 14.9337C20.2595 19.1602 16.368 22 12 22C7.632 22 3.7405 19.1602 2.4397 14.9337M8.6788 2.5675C9.7475 2.1914 10.8707 2 12 2C13.1293 2 14.2525 2.1914 15.3212 2.5675M6 5.0022L7.3754 7.6246L9.9978 9L7.3754 10.3754L6 12.9978L4.6246 10.3754L2.0022 9L4.6246 7.6246ZM18 5.0022L19.3754 7.6246L21.9978 9L19.3754 10.3754L18 12.9978L16.6246 10.3754L14.0022 9L16.6246 7.6246ZM8.7071 15.7071L9 16C10 17 11 17.5 12 17.5C13 17.5 14 17 15 16L15.2929 15.7071" fill="none"/>
    </svg>
  )
}
