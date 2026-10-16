import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Grid2x2Plus({ size = 24, ...props }: IconProps) {
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
      <path d="M5 1H17C19.2091 1 21 2.7909 21 5V9C21 10.6569 19.6569 12 18 12H12V18C12 19.6569 10.6569 21 9 21H5C2.7909 21 1 19.2091 1 17V5C1 2.7909 2.7909 1 5 1ZM5 3C3.8954 3 3 3.8954 3 5V10H10V3Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M19 16L19 22M16 19L22 19"/>
    </svg>
  )
}
