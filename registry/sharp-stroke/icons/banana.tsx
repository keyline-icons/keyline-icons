import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Banana({ size = 24, ...props }: IconProps) {
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
      <path d="M3.501 6.398L2.106 2.324M14.755 16.103C16.322 16.103 19.247 13.095 20.727 11.349C20.87 11.179 20.879 10.94 20.754 10.757L20.194 9.938C20.045 9.72 19.749 9.651 19.506 9.766C15.781 11.53 10.354 11.045 8.029 10.56L7.55 10.46M5.136 7.291C7.512 11.049 12.952 16.851 20.873 17.992C21.507 18.084 22 18.6 22 19.225C22 19.764 21.635 20.24 21.096 20.363C15.299 21.684 4.694 21.753 2.339 12.578C1.92 10.948 1.637 7.934 3.075 6.627C3.727 6.035 4.669 6.552 5.136 7.291Z"/>
    </svg>
  )
}
