import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SoccerBall({ size = 24, ...props }: IconProps) {
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
      <path d="M14.8002 8.1459L17.8779 3.9098M16.5308 13.4721L21.5106 15.0902M12 16.7639L12 22M7.4692 13.4721L2.4894 15.0902M9.1998 8.1459L6.1221 3.9098" fill="none" strokeOpacity="0.4"/>
      <path d="M22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12ZM14.2124 7.9549C14.6456 7.9549 15.0296 8.2339 15.1634 8.6459L16.5308 12.8541C16.5632 12.9539 16.5797 13.0582 16.5797 13.1631C16.5797 13.4832 16.4265 13.784 16.1675 13.9721L12.5878 16.5729C12.4169 16.6971 12.2112 16.7639 12 16.7639C11.7888 16.7639 11.5831 16.6971 11.4122 16.5729L7.8325 13.9721C7.5735 13.784 7.4203 13.4832 7.4203 13.1631C7.4203 13.0582 7.4368 12.9539 7.4692 12.8541L8.8366 8.6459C8.9704 8.2339 9.3544 7.9549 9.7876 7.9549L14.2124 7.9549Z" fill="none"/>
    </svg>
  )
}
