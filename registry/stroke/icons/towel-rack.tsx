import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TowelRack({ size = 24, ...props }: IconProps) {
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
      <path d="M2 7H9M20 7H22M20 7C20 4.79 18.2091 3 16 3H6.5M20 7V13V17M9 15H6C4.8954 15 4 14.1 4 13V5.5C4 4.12 5.1193 3 6.5 3M9 15V13V5.5C9 4.12 7.8807 3 6.5 3M9 15V17M9 17V19C9 20.1 9.8954 21 11 21H18C19.1046 21 20 20.1 20 19V17M9 17H20"/>
    </svg>
  )
}
