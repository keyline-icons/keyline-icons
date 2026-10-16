import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileType({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5195 1.1054 14.707 1.293L20.707 7.293C20.8946 7.4805 21 7.7348 21 8L21 18C21 20.7614 18.7614 23 16 23L8 23C5.2386 23 3 20.7614 3 18L3 6C3 3.2386 5.2386 1 8 1L14 1ZM7 14C7 14.5523 7.4477 15 8 15C8.5523 15 9 14.5523 9 14L9 13L11 13L11 17L10 17C9.4477 17 9 17.4477 9 18C9 18.5523 9.4477 19 10 19L12 19L14 19C14.5523 19 15 18.5523 15 18C15 17.4477 14.5523 17 14 17L13 17L13 13L15 13L15 14C15 14.5523 15.4477 15 16 15C16.5523 15 17 14.5523 17 14L17 13C17 11.8954 16.1046 11 15 11L12 11L9 11C7.8954 11 7 11.8954 7 13L7 14ZM14 5C14 6.6568 15.3431 8 17 8L18.5858 8L14 3.4142L14 5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
