import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ChartLineUp({ size = 24, ...props }: IconProps) {
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
      <path d="M3 3L3 19C3 20.1046 3.8954 21 5 21L21 21" strokeOpacity="0.4"/>
      <path d="M7 15L10.3887 11.1877C10.7342 10.799 11.32 10.74 11.7361 11.0521L14.3361 13.002C14.721 13.2908 15.2571 13.2644 15.6118 12.9392L20.2628 8.6757M16.5 8L20.5 8C20.7761 8 21 8.2239 21 8.5L21 12.5"/>
    </svg>
  )
}
