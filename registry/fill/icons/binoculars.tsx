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
      <path d="M11 11L11 13L13 13L13 11L11 11ZM11 15L11 16.7273C11 17.4302 10.4302 18 9.7273 18C8.7733 18 8 18.7733 8 19.7273C8 20.4302 7.4302 21 6.7273 21L3 21C1.8954 21 1 20.1046 1 19L1 18.099C1 17.9674 1.013 17.8361 1.0388 17.7071L2.8586 8.6078C2.9854 7.974 3.4105 7.4406 4 7.1757L4 5C4 3.8954 4.8954 3 6 3L8 3C9.1046 3 10 3.8954 10 5L10 7.2678C10.6189 7.625 11.0001 8.2854 11 9L13 9C12.9997 8.2853 13.3809 7.6248 14 7.2675L14 5C14 3.8954 14.8954 3 16 3L18 3C19.1046 3 20 3.8954 20 5L20 7.1755C20.5896 7.4405 21.0147 7.974 21.1414 8.6078L22.9612 17.7071C22.987 17.8361 23 17.9674 23 18.099L23 19C23 20.1046 22.1046 21 21 21L17.2727 21C16.5698 21 16 20.4302 16 19.7273C16 18.7733 15.2267 18 14.2727 18C13.5698 18 13 17.4302 13 16.7273L13 15L11 15ZM6 5L6 7L8 7L8 5L6 5ZM16 5L16 7L18 7L18 5L16 5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
