import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitPullRequestPlus({ size = 24, ...props }: IconProps) {
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
      <path d="M6 15V3M18 15V21M15 18H21M18 11V9M9 18H11"/>
      <path d="M10 18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18C2 15.7909 3.79086 14 6 14C8.20914 14 10 15.7909 10 18ZM22 6C22 8.20914 20.2091 10 18 10C15.7909 10 14 8.20914 14 6C14 3.79086 15.7909 2 18 2C20.2091 2 22 3.79086 22 6Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
