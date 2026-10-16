import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TabletZap({ size = 24, ...props }: IconProps) {
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
      <path d="M2 5L2 19C2 19.5523 2.44772 20 3 20L13 20L13 11L22 11L22 5C22 4.44772 21.5523 4 21 4L3 4C2.44772 4 2 4.44772 2 5ZM13.5 8.5C13.5 9.3284 12.8284 10 12 10C11.1716 10 10.5 9.3284 10.5 8.5C10.5 7.6716 11.1716 7 12 7C12.8284 7 13.5 7.6716 13.5 8.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M22 11L22 4L2 4L2 20L13 20M20.2929 13.7071L17 17L21 17L17.7071 20.2929"/>
    </svg>
  )
}
