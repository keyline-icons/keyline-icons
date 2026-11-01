import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FlashlightOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19 19L18.2361 19C16.6103 19 15.0069 18.6215 13.5528 17.8944C12.3764 17.3062 11.0792 17 9.7639 17L4 17C2.3431 17 1 15.6569 1 14L1 10C1 8.3431 2.3431 7 4 7L7 7L19 19ZM12.7152 6.4694C13.0007 6.3633 13.2803 6.2418 13.5528 6.1056C15.0069 5.3785 16.6103 5 18.2361 5L20 5C21.6569 5 23 6.3431 23 8L23 16C23.0001 16.1593 22.9875 16.3184 22.9625 16.4758L22.9428 16.4726C22.8669 16.9482 22.4567 17.2982 21.9751 17.2982C21.7151 17.2982 21.4657 17.1949 21.2819 17.011L21.2678 17.0251L12.3564 8.1138L12.3706 8.0997C12.1867 7.9158 12.0833 7.6665 12.0833 7.4065C12.0833 6.9969 12.3381 6.6305 12.7221 6.4878L12.7152 6.4694Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 12L10 12M8 8L4 8C2.8954 8 2 8.8954 2 10L2 14C2 15.1046 2.8954 16 4 16L9.7639 16C11.2344 16 12.6847 16.3424 14 17C15.2439 17.6219 16.6086 17.9619 17.997 17.997M2 2L22 22" fill="none"/>
    </svg>
  )
}
