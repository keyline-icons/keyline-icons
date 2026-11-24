import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Teapot({ size = 24, ...props }: IconProps) {
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
      <path d="M18 16.5C20 16.5 18.5 11.5 22 11M6.2764 12.5H4C2.8954 12.5 2 13.3954 2 14.5C2 15.6046 2.8954 16.5 4 16.5H6M6 14C6 11.2386 8.6863 9 12 9C15.3137 9 18 11.2386 18 14V18C18 19.1046 17.1046 20 16 20H8C6.8954 20 6 19.1046 6 18V14ZM9 9.5V7C9 5.89543 9.89543 5 11 5H12M15 9.5V7C15 5.89543 14.1046 5 13 5H12M12 5V4"/>
    </svg>
  )
}
