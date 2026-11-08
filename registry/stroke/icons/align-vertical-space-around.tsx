import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function AlignVerticalSpaceAround({ size = 24, ...props }: IconProps) {
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
      <path d="M22 20H2M22 4H2M15 9H9C7.8895 9 7 9.903 7 11V12V13C7 14.112 7.8948 15 9 15H15C16.1039 15 17 14.105 17 13V12V11C17 9.895 16.0986 9 15 9Z"/>
    </svg>
  )
}
