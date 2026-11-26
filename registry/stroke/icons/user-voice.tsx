import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function UserVoice({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M8 13H10C13.3137 13 16 15.6863 16 19V20C16 20.5523 15.5523 21 15 21H3C2.44772 21 2 20.5523 2 20V19C2 15.6863 4.68629 13 8 13ZM9 3C10.6569 3 12 4.34315 12 6C12 7.65685 10.6569 9 9 9C7.34315 9 6 7.65685 6 6C6 4.34315 7.34315 3 9 3ZM17.4853 3C17.8259 3.9635 18 4.978 18 6C18 7.022 17.8259 8.0365 17.4853 9M21.6491 3C21.8822 3.983 22 4.9898 22 6C22 8.282 21.3993 10.5238 20.2583 12.5"/>
    </svg>
  )
}
