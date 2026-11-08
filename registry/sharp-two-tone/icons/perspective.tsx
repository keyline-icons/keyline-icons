import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Perspective({ size = 24, ...props }: IconProps) {
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
      <path d="M13 5.26L18.79 4.02C19.085 3.96 19.394 4.03 19.629 4.22C19.864 4.41 20 4.7 20 5V11H23V13H20V20C20 20.31 19.853 20.61 19.603 20.8C19.352 20.99 19.027 21.05 18.726 20.96L13 19.33V23H11V18.75L4.726 16.96C4.296 16.84 4 16.45 4 16V13H1V11H4V8C4 7.53 4.329 7.12 4.79 7.02L11 5.69V1H13V5.26Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 1V12M12 12V23M12 12H1M12 12H23M5 8V16L19 20V5L5 8Z"/>
    </svg>
  )
}
