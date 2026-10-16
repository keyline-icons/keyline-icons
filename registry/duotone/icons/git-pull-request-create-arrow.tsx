import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GitPullRequestCreateArrow({ size = 24, ...props }: IconProps) {
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
      <path d="M10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M6 21L6 9M14 6L16 6C17.1046 6 18 6.8954 18 8L18 12M14.7929 4L13.1465 5.6465C12.9512 5.8417 12.9512 6.1583 13.1465 6.3536L14.7929 8M18.5 16L18.5 21M16 18.5L21 18.5"/>
    </svg>
  )
}
