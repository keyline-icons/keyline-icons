import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CarTaxi({ size = 24, ...props }: IconProps) {
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
      <path d="M1 19L1 15C1 14.8925 1.0173 14.7857 1.0513 14.6838L3.718 6.6838C3.8541 6.2754 4.2362 6 4.6667 6L13 6C13.2869 6 13.56 6.1232 13.7498 6.3384L18.5717 11.8031L22.3162 13.0513C22.7246 13.1874 23 13.5696 23 14L23 19C23 19.5523 22.5523 20 22 20L2 20C1.4477 20 1 19.5523 1 19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.3874 11L8 11L8 8L5.3874 8L4.3874 11ZM10 11L15.2328 11L12.5858 8L10 8L10 11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 19C8 20.1046 7.1046 21 6 21C4.8954 21 4 20.1046 4 19C4 17.8954 4.8954 17 6 17C7.1046 17 8 17.8954 8 19ZM19 19C19 20.1046 18.1046 21 17 21C15.8954 21 15 20.1046 15 19C15 17.8954 15.8954 17 17 17C18.1046 17 19 17.8954 19 19ZM6.5 3L11.5 3" fill="none"/>
    </svg>
  )
}
