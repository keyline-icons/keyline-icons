import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Car({ size = 24, ...props }: IconProps) {
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
      <path d="M4 17L3 17C2.4477 17 2 16.5523 2 16L2 13.6491C2 13.2192 2.0693 12.7921 2.2053 12.3842L4.2108 6.3675C4.483 5.5509 5.2473 5 6.1082 5L12.0975 5C12.6713 5 13.2175 5.2465 13.5971 5.6768L18 10.6667L20.6325 11.5442C21.4491 11.8164 22 12.5807 22 13.4415L22 16C22 16.5523 21.5523 17 21 17L19 17M8 17L15 17M3 10L15.3509 10C15.7808 10 16.2079 10.0693 16.6158 10.2053L18 10.6667M9 5L9 8C9 9.1046 9.8954 10 11 10M8 17C8 18.1046 7.1046 19 6 19C4.8954 19 4 18.1046 4 17C4 15.8954 4.8954 15 6 15C7.1046 15 8 15.8954 8 17ZM19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17C15 15.8954 15.8954 15 17 15C18.1046 15 19 15.8954 19 17Z"/>
    </svg>
  )
}
