import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FileVideo({ size = 24, ...props }: IconProps) {
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
      <path d="M14 1C14.2652 1 14.5195 1.1054 14.707 1.293L20.707 7.293C20.8946 7.4805 21 7.7348 21 8L21 18C21 20.7614 18.7614 23 16 23L8 23C5.2386 23 3 20.7614 3 18L3 6C3 3.2386 5.2386 1 8 1L14 1ZM14 5C14 6.6568 15.3431 8 17 8L18.5858 8L14 3.4142L14 5ZM10.8944 18.7889L14.8944 16.7889C15.572 16.4501 16 15.7575 16 15C16 14.2425 15.572 13.5499 14.8944 13.2111L10.8944 11.2111C10.6167 11.0723 10.3105 11 10 11C8.8954 11 8 11.8954 8 13L8 17C8 18.1046 8.8954 19 10 19C10.3105 19 10.6167 18.9277 10.8944 18.7889Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
