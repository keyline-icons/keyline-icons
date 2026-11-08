import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CogDot({ size = 24, ...props }: IconProps) {
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
      <path d="M20 12C20 16.42 16.418 20 12 20M20 12H23M20 12H14M12 20C7.582 20 4 16.42 4 12M12 20V23M4 12C4 7.58 7.582 4 12 4V1M4 12H1M14 12C14 10.9 13.105 10 12 10C10.895 10 10 10.9 10 12C10 13.1 10.895 14 12 14C13.105 14 14 13.1 14 12ZM6.711 2.85L8 5.08L10.837 10M16 18.94L17.289 21.17M2.837 6.71L5.069 8M18.926 16L21.158 17.29M2.842 17.29L5.074 16M6.711 21.17L8 18.94L10.854 14M19 2C20.657 2 22 3.34 22 5C22 6.66 20.657 8 19 8C17.343 8 16 6.66 16 5C16 3.34 17.343 2 19 2Z"/>
    </svg>
  )
}
