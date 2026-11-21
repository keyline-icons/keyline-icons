import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Bee({ size = 24, ...props }: IconProps) {
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
      <path d="M6.8169 17.5504C5.9307 17.8422 4.9838 18 4 18C2.8954 18 2 17.1046 2 16L2 15C2 12.515 3.0084 10.2636 4.636 8.636C5.5896 7.6824 6.7573 6.9413 8.0607 6.4911C8.0211 6.334 8 6.1695 8 6C8 3.7908 9.7908 2 12 2C13.1043 2 14.1057 2.4488 14.8284 3.1716C15.5512 3.8943 16 4.8957 16 6C16 6.1694 15.9789 6.3338 15.9393 6.4909C19.4666 7.7091 22 11.0587 22 15L22 16C22 17.1046 21.1046 18 20 18C19.0164 18 18.0694 17.842 17.1832 17.5502C16.5468 19.0624 15.0763 21.3939 12.4961 22.8682C12.345 22.9546 12.174 23 12 23C11.826 23 11.655 22.9546 11.5039 22.8682C8.9239 21.3939 7.4533 19.0626 6.8169 17.5504Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M11 7C6.5817 7 3 10.5817 3 15V16C3 16.5523 3.4477 17 4 17C8.4183 17 12 13.4183 12 9V8C12 7.4477 11.5523 7 11 7ZM13 7C17.4183 7 21 10.5817 21 15V16C21 16.5523 20.5523 17 20 17C15.5817 17 12 13.4183 12 9V8C12 7.4477 12.4477 7 13 7ZM15 6C15 4.3431 13.6569 3 12 3C10.3431 3 9 4.3431 9 6C9 6.5523 9.4477 7 10 7H14C14.5523 7 15 6.5523 15 6ZM9.5 3.5L8 2M14.5 3.5L16 2M7.5 16.5C7.8333 17.6667 9.2 20.4 12 22C14.8 20.4 16.1667 17.6667 16.5 16.5"/>
    </svg>
  )
}
