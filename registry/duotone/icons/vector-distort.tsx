import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function VectorDistort({ size = 24, ...props }: IconProps) {
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
      <path d="M7 5L17 8M19 10L17 17M15 19L9 15M7 13L5 7" strokeOpacity="0.4"/>
      <path d="M5 2L6 2C7.1046 2 8 2.8954 8 4L8 6C8 7.1046 7.1046 8 6 8L4 8C2.8954 8 2 7.1046 2 6L2 4C2 2.8954 2.8954 2 4 2ZM19 5L20 5C21.1046 5 22 5.8954 22 7L22 9C22 10.1046 21.1046 11 20 11L18 11C16.8954 11 16 10.1046 16 9L16 7C16 5.8954 16.8954 5 18 5ZM17 16L18 16C19.1046 16 20 16.8954 20 18L20 20C20 21.1046 19.1046 22 18 22L16 22C14.8954 22 14 21.1046 14 20L14 18C14 16.8954 14.8954 16 16 16ZM7 12L8 12C9.1046 12 10 12.8954 10 14L10 16C10 17.1046 9.1046 18 8 18L6 18C4.8954 18 4 17.1046 4 16L4 14C4 12.8954 4.8954 12 6 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
