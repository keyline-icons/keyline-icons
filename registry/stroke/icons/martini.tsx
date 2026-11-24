import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Martini({ size = 24, ...props }: IconProps) {
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
      <path d="M3.002 3H20.998C21.8889 3 22.335 4.0771 21.7051 4.7071L13.0607 13.3515C12.4749 13.9373 11.5251 13.9373 10.9393 13.3515L2.2949 4.7071C1.665 4.0771 2.1111 3 3.002 3ZM4.5878 7H19.4122M12 13.7909V21M6 21H18"/>
    </svg>
  )
}
