import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function NavigationUpRight({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19.811 3C20.093 2.98 20.55 3.12 20.756 3.32C20.953 3.59 21.063 4 20.955 4.32L15.467 20.32C15.339 20.69 15.003 20.96 14.61 20.99C14.218 21.03 13.84 20.83 13.647 20.49L9.991 13.98L3.505 10.35C3.161 10.16 2.969 9.7 3.004 9.31C3.085 8.98 3.344 8.64 3.669 8.53L19.811 3Z" fill="currentColor"/>
    </svg>
  )
}
