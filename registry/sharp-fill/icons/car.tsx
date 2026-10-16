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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M1 17L1 13C1 12.8925 1.0173 12.7857 1.0513 12.6838L3.718 4.6838C3.8541 4.2754 4.2362 4 4.6667 4L13 4C13.2869 4 13.56 4.1232 13.7498 4.3384L18.5717 9.8031L22.3162 11.0513C22.7246 11.1874 23 11.5696 23 12L23 17C23 17.5523 22.5523 18 22 18L18.7321 18C18.9076 17.696 19 17.3511 19 17C19 15.8954 18.1046 15 17 15C15.8954 15 15 15.8954 15 17C15 17.3511 15.0924 17.696 15.2679 18L7.7321 18C7.9076 17.696 8 17.3511 8 17C8 15.8954 7.1046 15 6 15C4.8954 15 4 15.8954 4 17C4 17.3511 4.0924 17.696 4.2679 18L2 18C1.4477 18 1 17.5523 1 17ZM4.3874 9L8 9L8 6L5.3874 6L4.3874 9ZM10 9L15.2328 9L12.5858 6L10 6L10 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M8 17C8 18.1046 7.1046 19 6 19C4.8954 19 4 18.1046 4 17C4 15.8954 4.8954 15 6 15C7.1046 15 8 15.8954 8 17ZM19 17C19 18.1046 18.1046 19 17 19C15.8954 19 15 18.1046 15 17C15 15.8954 15.8954 15 17 15C18.1046 15 19 15.8954 19 17Z"/>
    </svg>
  )
}
