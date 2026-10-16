import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Wand({ size = 24, ...props }: IconProps) {
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
      <path d="M19.2929 2.5858L21.4142 4.7071C22.1953 5.4882 22.1953 6.7545 21.4142 7.5355L7.5355 21.4142C6.7545 22.1953 5.4882 22.1953 4.7071 21.4142L2.5858 19.2929C1.8047 18.5118 1.8047 17.2455 2.5858 16.4645L16.4645 2.5858C17.2455 1.8047 18.5118 1.8047 19.2929 2.5858Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M18.5858 3.2929L20.7071 5.4142C21.0976 5.8047 21.0976 6.4379 20.7071 6.8284L6.8284 20.7071C6.4379 21.0976 5.8047 21.0976 5.4142 20.7071L3.2929 18.5858C2.9024 18.1953 2.9024 17.5621 3.2929 17.1716L17.1716 3.2929C17.5621 2.9024 18.1953 2.9024 18.5858 3.2929ZM13.2908 7.1737L16.8263 10.7092"/>
    </svg>
  )
}
