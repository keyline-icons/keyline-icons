import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SearchActivity({ size = 24, ...props }: IconProps) {
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
      <path d="M15.6569 15.6569C14.2102 17.1035 12.2089 18 10 18C5.5817 18 2 14.4183 2 10C2 5.5817 5.5817 2 10 2C14.4183 2 18 5.5817 18 10C18 12.2089 17.1035 14.2102 15.6569 15.6569Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M5 10L7.5 10L9 7.5L11 12.5L12.5 10L15 10M15 15L21 21"/>
    </svg>
  )
}
