import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MaskTheater({ size = 24, ...props }: IconProps) {
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
      <path d="M7 9C7 8.1716 7.6716 7.5 8.5 7.5C9.3284 7.5 10 8.1716 10 9M14 9C14 8.1716 14.6716 7.5 15.5 7.5C16.3284 7.5 17 8.1716 17 9M5.4339 2.04889L10.3867 2.85855C11.4551 3.03322 12.5449 3.03322 13.6133 2.85855L18.5661 2.04889C19.8152 1.77129 21 2.72169 21 4.00119V12.0153C21 14.5739 20.0192 17.0353 18.2595 18.8927L17.4447 19.7529C14.4864 22.749 9.51356 22.749 6.55535 19.7529L5.74047 18.8927C3.98077 17.0353 3 14.5739 3 12.0153V4.00119C3 2.72169 4.1848 1.77129 5.4339 2.04889ZM7 13C7.5 14.4583 9.17157 18 12 18C14.5 18 16.5 14.875 17 13M7 13C8.66667 13.7546 13 14.8111 17 13"/>
    </svg>
  )
}
