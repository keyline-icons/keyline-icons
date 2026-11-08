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
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3.3734 6.024L2.3386 3M8.03 10.559C10.3549 11.044 15.7819 11.53 19.5072 9.766C19.7497 9.651 20.0455 9.72 20.1951 9.938L20.7553 10.757C20.8803 10.939 20.8707 11.179 20.7274 11.348C19.2483 13.095 16.3229 16.103 14.7563 16.103M5.136 7.288C7.5118 11.046 12.9524 16.849 20.8732 17.99C21.5074 18.081 22 18.598 22 19.222C22 19.762 21.6354 20.238 21.0963 20.36C15.2993 21.681 4.6936 21.75 2.3386 12.575C1.9202 10.945 1.6372 7.932 3.0754 6.625C3.7267 6.033 4.6689 6.549 5.136 7.288Z"/>
    </svg>
  )
}
