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
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M11 16L2 16C1.4477 16 1 15.5523 1 15C1 14.8925 1.0173 14.7857 1.0513 14.6838L5.0513 2.6838C5.1874 2.2754 5.5696 2 6 2L18 2C18.4304 2 18.8126 2.2754 18.9487 2.6838L22.9487 14.6838C22.9827 14.7857 23 14.8925 23 15C23 15.5523 22.5523 16 22 16L13 16L13 20L17 20L17 22L7 22L7 20L11 20Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M10.895 4L13.105 4L13.5494 8L10.4506 8ZM15.1173 4L17.2792 4L18.6126 8L15.5617 8ZM19.2792 10L20.6126 14L16.2283 14L15.7839 10ZM14.2161 14L9.7839 14L10.2284 10L13.7716 10ZM7.7717 14L3.3874 14L4.7208 10L8.2161 10ZM5.3874 8L6.7208 4L8.8827 4L8.4383 8Z" fill="currentColor"/>
    </svg>
  )
}
