import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Link2Off({ size = 24, ...props }: IconProps) {
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
      <path d="M10 17L7 17C4.2386 17 2 14.7614 2 12C2 9.2386 4.2386 7 7 7M17 17L14 17M7 12L12 12" strokeOpacity="0.4"/>
      <path d="M1.7071 1.7071L22.2929 22.2929"/>
      <path d="M14 7L17 7C19.7614 7 22 9.2386 22 12C22 13.2135 21.5677 14.326 20.8488 15.1919L20.21 15.9613" strokeOpacity="0.4"/>
    </svg>
  )
}
