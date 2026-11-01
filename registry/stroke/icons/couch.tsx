import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Couch({ size = 24, ...props }: IconProps) {
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
      <path d="M19 18L5 18M19 18C20.6569 18 22 16.6569 22 15L22 13C22 11.8954 21.1046 11 20 11M5 18C3.3431 18 2 16.6569 2 15L2 13C2 11.8954 2.8954 11 4 11M12 5L10 5C6.6863 5 4 7.6863 4 11M12 5L14 5C17.3137 5 20 7.6863 20 11M12 5L12 14M12 14L6.5 14C6.2239 14 6 13.7761 6 13.5L6 13C6 11.8954 5.1046 11 4 11M12 14L17.5 14C17.7761 14 18 13.7761 18 13.5L18 13C18 11.8954 18.8954 11 20 11M19 18L19 19M5 18L5 19" fill="none"/>
    </svg>
  )
}
