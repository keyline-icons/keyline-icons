import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Binoculars({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4 8L4 5C4 3.8954 4.8954 3 6 3L8 3C9.1046 3 10 3.8954 10 5L10 8C10 8.5523 9.5523 9 9 9L5 9C4.4477 9 4 8.5523 4 8ZM20 8C20 8.5523 19.5523 9 19 9L15 9C14.4477 9 14 8.5523 14 8L14 5C14 3.8954 14.8954 3 16 3L18 3C19.1046 3 20 3.8954 20 5L20 8ZM10 9L14 9C14.5523 9 15 9.4477 15 10C15 10.5523 14.5523 11 14 11L10 11C9.4477 11 9 10.5523 9 10C9 9.4477 9.4477 9 10 9ZM14 15L10 15C9.4477 15 9 14.5523 9 14C9 13.4477 9.4477 13 10 13L14 13C14.5523 13 15 13.4477 15 14C15 14.5523 14.5523 15 14 15Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M5 7L9 7C10.1046 7 11 7.8954 11 9L11 16.7273C11 17.4302 10.4302 18 9.7273 18C8.7733 18 8 18.7733 8 19.7273C8 20.4302 7.4302 21 6.7273 21L3 21C1.8954 21 1 20.1046 1 19L1 18.099C1 17.9674 1.013 17.8361 1.0388 17.7071L2.8586 8.6078C3.0456 7.6729 3.8664 7 4.8198 7L5 7ZM19 7L19.1802 7C20.1336 7 20.9544 7.6729 21.1414 8.6078L22.9612 17.7071C22.987 17.8361 23 17.9674 23 18.099L23 19C23 20.1046 22.1046 21 21 21L17.2727 21C16.5698 21 16 20.4302 16 19.7273C16 18.7733 15.2267 18 14.2727 18C13.5698 18 13 17.4302 13 16.7273L13 9C13 7.8954 13.8954 7 15 7L19 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
