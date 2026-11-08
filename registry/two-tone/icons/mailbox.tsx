import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Mailbox({ size = 24, ...props }: IconProps) {
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
      <path d="M17 3C20.3137 3 23 5.69 23 9V17C23 18.1 22.1046 19 21 19H13V20C13 20.55 12.5523 21 12 21C11.4477 21 11 20.55 11 20V19H3C1.8954 19 1 18.1 1 17V9C1 5.69 3.6863 3 7 3H17Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M7 4H17C19.7614 4 22 6.24 22 9V17C22 17.55 21.5523 18 21 18H11M7 4C4.2386 4 2 6.24 2 9V17C2 17.55 2.4477 18 3 18H11M7 4C9.7614 4 12 6.24 12 9V17C12 17.55 11.5523 18 11 18M6 9H8M12 18V20"/>
    </svg>
  )
}
