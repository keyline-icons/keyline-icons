import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tools({ size = 24, ...props }: IconProps) {
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
      <path d="M21.918 6.5541C21.9726 6.8664 22 7.1829 22 7.5C22 10.5376 19.5376 13 16.5 13C13.4624 13 11 10.5376 11 7.5C11 4.4624 13.4624 2 16.5 2C16.8171 2 17.1336 2.0274 17.4459 2.082C16.052 2.5789 15.1213 3.8988 15.1213 5.3787C15.1213 7.3117 16.6883 8.8787 18.6213 8.8787C20.1012 8.8787 21.4211 7.948 21.918 6.5541ZM16.0211 12.9791C15.9777 12.9753 15.9341 12.9734 15.8905 12.9734C15.4927 12.9734 15.1112 13.1315 14.8299 13.4128L7.1213 21.1213C6.5587 21.6839 5.7956 22 5 22C3.3431 22 2 20.6569 2 19C2 18.2044 2.3161 17.4413 2.8787 16.8787L10.5872 9.1701C10.8685 8.8888 11.0266 8.5073 11.0266 8.1095C11.0266 8.0659 11.0247 8.0223 11.0209 7.9789M14.8284 19.0711L16.8786 21.1213C18.0502 22.2929 19.9497 22.2929 21.1213 21.1213C22.2929 19.9497 22.2929 18.0503 21.1213 16.8787L20.4036 16.161C19.3017 16.6577 18.1151 16.9402 16.9075 16.992ZM7 7L7 4L3 2L2 3L4 7Z" fill="none"/>
    </svg>
  )
}
