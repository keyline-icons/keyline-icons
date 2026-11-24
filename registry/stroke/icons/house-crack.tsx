import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function HouseCrack({ size = 24, ...props }: IconProps) {
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
      <path d="M2 10.8473L10.7072 3.47028C11.4532 2.83828 12.5468 2.83828 13.2928 3.47028L22 10.8473M4 9.15278V19C4 20.1046 4.8954 21 6 21H18C19.1046 21 20 20.1046 20 19V9.15278M12 2.99998L10.5 7.49998L13.5 9.99998L10.5 14L13.5 17L12 21"/>
    </svg>
  )
}
