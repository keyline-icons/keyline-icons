import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Monitor({ size = 24, ...props }: IconProps) {
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
      <path d="M12 16L12 20M8 20L16 20" strokeOpacity="0.4"/>
      <path d="M5 3H19C21.20914 3 23 4.79086 23 7V13C23 15.20914 21.20914 17 19 17H5C2.79086 17 1 15.20914 1 13V7C1 4.79086 2.79086 3 5 3Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
