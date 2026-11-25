import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BaselineShift({ size = 24, ...props }: IconProps) {
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
      <path d="M1.928 14.6273L7 2L12.072 14.6273M4.188 9L9.812 9M22 1L22 10M22 6C22 7.657 20.657 9 19 9C17.343 9 16 7.657 16 6C16 4.343 17.343 3 19 3C20.657 3 22 4.343 22 6ZM19 23L19 13M22.2929 16.2929L19 13L15.7071 16.2929"/>
    </svg>
  )
}
