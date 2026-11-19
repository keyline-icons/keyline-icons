import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SolarPanel({ size = 24, ...props }: IconProps) {
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
      <path d="M5.1828 4.7007C5.6823 3.6611 6.7335 3 7.8868 3L16.1132 3C17.2665 3 18.3177 3.6611 18.8172 4.7007L21.7003 10.7007C22.6574 12.6923 21.2059 15 18.9963 15L5.0037 15C2.7941 15 1.3426 12.6923 2.2997 10.7007ZM10 3L8.0779 15M14 3L15.9221 15M3.1169 9L20.8831 9M12 15V21M8 21H16" fill="none"/>
    </svg>
  )
}
