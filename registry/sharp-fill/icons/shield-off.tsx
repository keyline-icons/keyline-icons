import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShieldOff({ size = 24, ...props }: IconProps) {
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
      <path d="M18.852 18.852C17.567 20.311 15.649 21.882 13.175 22.791C12.417 23.07 11.583 23.07 10.825 22.791C7.967 21.741 5.852 19.808 4.597 18.185L3.209 16.389C3.073 16.214 3 15.999 3 15.778V5.309C3 4.802 3.379 4.376 3.882 4.316L4.27 4.27L18.852 18.852ZM7.282 3.626C8.576 3.122 9.582 2.379 10.328 1.655C11.229 0.782 12.771 0.782 13.672 1.655C14.8 2.75 16.523 3.889 18.935 4.175L20.118 4.316C20.621 4.376 21 4.802 21 5.309V15.778C21 15.999 20.927 16.215 20.791 16.39L20.466 16.81L7.282 3.626Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.707 1.707L22.293 22.293"/>
    </svg>
  )
}
