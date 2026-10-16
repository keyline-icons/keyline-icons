import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CircleNavigation({ size = 24, ...props }: IconProps) {
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
      <path d="M19.4 19.8L20 19C21.2982 17.269 22 15.1637 22 13C22 7.4771 17.5229 3 12 3C6.4771 3 2 7.4771 2 13C2 15.1637 2.7018 17.269 4 19L4.6 19.8"/>
      <path d="M6.0423 20.515L11.1255 11.3505C11.5063 10.6638 12.4937 10.6638 12.8745 11.3505L17.9577 20.515C18.3669 21.2526 17.735 22.1343 16.905 21.984L12 21.0957L7.095 21.984C6.265 22.1343 5.6331 21.2526 6.0423 20.515Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
    </svg>
  )
}
